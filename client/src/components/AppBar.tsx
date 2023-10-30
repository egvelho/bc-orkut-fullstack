import { Link } from "react-router-dom";
import { LinkButton } from "./LinkButton";

export function AppBar() {
  return (
    <header className="bg-white p-3 shadow-md flex flex-row justify-between">
      <div className="flex flex-row items-center gap-8">
        <Logo />
        <Link
          to="/"
          className="text-blue-400 hover:text-blue-600 hover:underline font-bold hidden md:block"
        >
          Página inicial
        </Link>
      </div>
      <div className="flex flex-row items-center gap-8">
        <LinkButton to="/criar-publicacao">Criar publicação</LinkButton>
        <LinkButton to="/entrar">Entrar</LinkButton>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <Link to="/" className="flex flex-row items-center gap-2" title="Orkut">
      <img
        alt="Orkut"
        src="/orkut.png"
        style={{
          height: "22px",
        }}
      />
    </Link>
  );
}
