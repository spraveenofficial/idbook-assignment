"use client";


import { QueryClient, QueryClientProvider } from "react-query";

interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      refetchOnReconnect: false,
    },
  },
});

export default function Providers(props: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
