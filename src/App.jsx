// src/App.jsx
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ExplorePage from "./pages/ExplorePage";
import DestinationsPage from "./pages/DestinationsPage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
     <Router>
      <ScrollToTop />
       <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
       <Route path="/destination/:cityName" element={<DestinationDetailPage />} />
      </Routes>
       <Footer />
     </Router>
    </QueryClientProvider>
  );
}

export default App;
