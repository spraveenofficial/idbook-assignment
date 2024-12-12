"use client";

import { ModalProvider } from "@/contexts/modal-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "@/components/ui/sonner";
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
      <Toaster />
      <ModalProvider>{props.children}</ModalProvider>
    </QueryClientProvider>
  );
}
