import { Routes, Route, Navigate } from "react-router-dom";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
import PostFormPage from "./pages/PostFormPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" />} />

      <Route
        path="/posts"
        element={<PostList />}
      />

      <Route
        path="/posts/:id"
        element={<PostDetail />}
      />

      <Route
        path="/posts/create"
        element={<PostFormPage />}
      />

      <Route
        path="/posts/:id/edit"
        element={<PostFormPage />}
      />
    </Routes>
  );
};

export default App;