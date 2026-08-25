import { Routes, Route, Navigate } from "react-router-dom";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
import PostFormPage from "./pages/PostFormPage";
import { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
      
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAPI();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" />} />

      <Route path="/posts" element={<PostList data={data} loading={loading} error={error}/>} />

      <Route path="/posts/:id" element={<PostDetail data={data} setData={setData} />} />

      <Route path="/posts/create" element={<PostFormPage data={data} setData={setData} />} />

      <Route path="/posts/:id/edit" element={<PostFormPage data={data} setData={setData} />} />
    </Routes>
  );
};

export default App;