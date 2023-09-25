import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { LinkButton } from "../components/LinkButton";
import { Card } from "../components/Card";
import { api } from "../api";

const pageSize = 30;

const initialPostsList = {
  count: 0,
  posts: [],
};
const initialLoading = true;
const initialSearch = "";
const initialOrderBy = "desc";

export function HomeRoute() {
  const [postsList, setPostsList] = useState(initialPostsList);
  const [loading, setLoading] = useState(initialLoading);
  const [search, setSearch] = useState(initialSearch);
  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const pageCount = Math.ceil(postsList.count / pageSize);
  const pages = new Array(pageCount).fill(null).map((_, index) => index + 1);

  async function loadPosts() {
    const response = await api.get(`/posts`, {
      params: {
        search,
        order_by: orderBy,
      },
    });
    const nextPosts = response.data;
    setPostsList(nextPosts);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    loadPosts();
  }, [search, orderBy]);

  useEffect(() => {
    if (postsList.posts.length > 0) {
      setLoading(false);
    }
  }, [postsList]);

  return (
    <Card>
      <Helmet>
        <title>Home | Orkut</title>
      </Helmet>
      {loading && (
        <div className="flex justify-center">
          <FaSpinner className="text-4xl animate-spin" />
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="search"
          placeholder="Buscar publicações..."
          className="flex-1 border-gray-400 focus:border-pink-600 rounded-2xl border-2 outline-none p-2"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select
          className="bg-white p-2 border-gray-400 focus:border-pink-600 rounded-md border-2"
          onChange={(event) => {
            setOrderBy(event.target.value);
          }}
        >
          <option value="desc">Mais recentes</option>
          <option value="asc">Mais antigas</option>
        </select>
      </div>
      {postsList.posts.length === 0 &&
        loading === false &&
        "Nenhum resultado encontrado"}
      {postsList.posts.map((post) => {
        return (
          <div key={post.id} className="border-b py-2">
            <div className="flex items-center gap-2">
              <Link to={`/perfil/${post.user_id}`}>
                <img
                  src={post.user_avatar}
                  alt={`Foto de ${post.user_first_name} ${post.user_last_name}`}
                  className="w-[48px] h-[48px] rounded-full"
                />
              </Link>
              <div className="flex flex-col">
                <Link
                  to={`/perfil/${post.user_id}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-bold"
                >
                  {post.user_first_name} {post.user_last_name}
                </Link>
                <span className="text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <Link
              to={`/ver-publicacao/${post.id}`}
              className="cursor-pointer block"
            >
              <p>{post.content}</p>
            </Link>
          </div>
        );
      })}
      <div className="flex flex-row gap-2 flex-wrap pt-4">
        {pages.map((page) => (
          <LinkButton key={page} to={`/publicacoes/${page}`}>
            {page}
          </LinkButton>
        ))}
      </div>
    </Card>
  );
}
