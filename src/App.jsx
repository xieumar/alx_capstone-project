// src/App.jsx
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DestinationSearch from "./components/DestinationSearch";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div >
        <main className="py-6">
          <DestinationSearch />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
