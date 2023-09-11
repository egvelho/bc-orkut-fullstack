import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import { Helmet } from "react-helmet";
import { api } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { LinkButton } from "../components/LinkButton";
import { Breadcrumbs } from "../components/Breadcrumbs";

const initialPost = {
  id: 0,
  content: "",
  created_at: "",
};

export function ViewPostRoute() {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(initialPost);

  async function loadPost() {
    const response = await api.get(`/posts/${params.id}`);
    const nextPost = response.data;
    setPost(nextPost);
  }

  async function deletePost() {
    const response = await api.delete(`/posts/${params.id}`);
    if (response.data.id) {
      toast(`A publicação #${post.id} foi deletada com sucesso!`);
      navigate("/");
    } else {
      toast("Houve um erro ao deletar a publicação");
    }
  }

  useEffect(() => {
    loadPost();
  }, [params.id]);

  return (
    <Card>
      <Helmet>
        <title>Ver publicação #{post.id}</title>
      </Helmet>
      <Breadcrumbs
        links={[
          { href: "/", label: "Home" },
          {
            href: `/ver-publicacao/${params.id}`,
            label: `Ver publicação #${params.id}`,
          },
        ]}
      />
      <div className="flex gap-2">
        <Button className="bg-red-500 hover:bg-red-700" onClick={deletePost}>
          Deletar
        </Button>
        <LinkButton
          className="bg-amber-500 hover:bg-amber-700"
          to={`/editar-publicacao/${params.id}`}
        >
          Editar
        </LinkButton>
      </div>
      <div className="text-gray-500 mb-2">#{post.id}</div>
      <div className="text-gray-500">
        {new Date(post.created_at).toLocaleDateString()}
      </div>
      <p>{post.content}</p>
    </Card>
  );
}
