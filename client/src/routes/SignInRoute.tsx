import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { api } from "../api";
import { TokenStorage } from "../tokenStorage";

const initialForm = {
  email: "",
  password: "",
};

export function SignInRoute() {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    api.get("/auth/session");
  }, []);

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await api.post("/auth/sign-in", form);
    if (response === undefined) {
      return;
    }
    const token = response.data.token;
    TokenStorage.setToken(token);
  }

  return (
    <div className="flex align-center justify-center w-full">
      <Card>
        <h2 className="text-center text-2xl mb-3">Entrar na sua conta</h2>
        <form onSubmit={submitForm} className="flex flex-col gap-2 w-full">
          <TextField
            valor={form.email}
            quandoMudar={(email) => setForm({ ...form, email })}
            textoPadrao="Email"
          />
          <TextField
            valor={form.password}
            quandoMudar={(password) => setForm({ ...form, password })}
            textoPadrao="Senha"
            tipo="password"
          />
          <Button type="submit">Entrar</Button>
        </form>
      </Card>
    </div>
  );
}
