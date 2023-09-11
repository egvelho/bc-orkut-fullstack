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

export function HomeRoute() {
  const [postsList, setPostsList] = useState(initialPostsList);
  const [loading, setLoading] = useState(initialLoading);
  const pageCount = Math.ceil(postsList.count / pageSize);
  const pages = new Array(pageCount).fill(null).map((_, index) => index + 1);

  async function loadPosts() {
    const response = await api.get("/posts");
    const nextPosts = response.data;
    setPostsList(nextPosts);
  }

  useEffect(() => {
    loadPosts();
  }, []);

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
      {postsList.posts.map((post) => {
        return (
          <Link
            to={`/ver-publicacao/${post.id}`}
            key={post.id}
            className="border-b py-2 cursor-pointer block"
          >
            <div className="text-gray-500 mb-2">#{post.id}</div>
            <span className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
            <p>{post.content}</p>
          </Link>
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
