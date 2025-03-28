import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageCard from "./pages/page-card/page-card";
import Home from "./pages/home";
import CreateCard from "./pages/create-card";

function App() {
  const URL =
    "https://api.github.com/search/repositories?q=as&page=2&per_page=20";

  const dispatch = useDispatch();
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(URL);

        if (!response.ok) {
          throw new Error("Error");
        }
        const data = await response.json();

        dispatch({ type: "GET_PRODUCTS", payload: data.items });
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home loading={loadingData} />} />
        <Route path="/products/:id" element={<PageCard />} />
        <Route path="/create-card" element={<CreateCard />} />
      </Routes>
    </Router>
  );
}

export default App;
