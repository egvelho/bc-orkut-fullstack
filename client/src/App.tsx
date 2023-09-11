import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppBar } from "./components/AppBar";
import { HomeRoute } from "./routes/HomeRoute";
import { CreatePostRoute } from "./routes/CreatePostRoute";
import { ViewPostRoute } from "./routes/ViewPostRoute";
import { EditPostRoute } from "./routes/EditPostRoute";
import { PostPageRoute } from "./routes/PostPageRoute";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <AppBar />
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/criar-publicacao" element={<CreatePostRoute />} />
          <Route path="/ver-publicacao/:id" element={<ViewPostRoute />} />
          <Route path="/editar-publicacao/:id" element={<EditPostRoute />} />
          <Route path="/publicacoes/:page" element={<PostPageRoute />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
