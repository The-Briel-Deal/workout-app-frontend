import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Workouts from "./pages/Workouts";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./utils/trpc";
function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://127.0.0.1:4000/trpc",

      // optional
      headers() {
        return {
          // authorization: getAuthCookie(),
        };
      },
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
