"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "~/components/Home/Home";

const queryClient = new QueryClient();

export default function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}
