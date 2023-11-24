import { useState, useEffect } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import toast from "react-simple-toasts";
import { Helmet } from "react-helmet";
import { Button } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Card } from "../components/Card";
import { TextField } from "../components/TextField";
import { api } from "../api";
import { useGlobalStore } from "../useGlobalStore";

export function UpdateProfileRoute() {
  const navigate = useNavigate();
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);

  const [name, setName] = useState(user.first_name);
  const [surname, setSurname] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);

  useEffect(() => {
    setName(user.first_name);
    setSurname(user.last_name);
    setEmail(user.email);
  }, [user]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user = {
      first_name: name,
      last_name: surname,
      email,
    };

    const response = await api.patch("/users/update-myself", user);
    if (response !== undefined) {
      setUser(response.data);
      toast("Perfil alterado com sucesso!");
      navigate("/usuario");
    }
  }

  return (
    <Card>
      <Helmet>
        <title>Atualizar perfil</title>
      </Helmet>
      <Breadcrumbs
        links={[
          { href: "/usuario", label: "Usuário" },
          {
            href: "/atualizar-perfil",
            label: "Atualizar perfil",
          },
        ]}
      />
      <form className="flex flex-col gap-2" noValidate onSubmit={onSubmit}>
        <h1 className="text-center font-bold text-2xl">Atualizar perfil</h1>
        <TextField valor={name} quandoMudar={setName} textoPadrao="Nome" />
        <TextField
          valor={surname}
          quandoMudar={setSurname}
          textoPadrao="Sobrenome"
        />
        <TextField
          valor={email}
          tipo="email"
          quandoMudar={setEmail}
          textoPadrao="Email"
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Card>
  );
}
