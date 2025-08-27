import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DestinationSearch from "./components/DestinationSearch";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DestinationSearch />
    </QueryClientProvider>
  );
}

export default App;
