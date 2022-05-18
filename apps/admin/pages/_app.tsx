import type { AppProps } from "next/app";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Modal, ModalWrapper } from "ui";
import { AuthProvider } from "ui";
import { Layout } from "../components/organism";

let modalRef: any;

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  useEffect(() => {
    Modal.registerModal(modalRef);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
      <ModalWrapper ref={(ref) => (modalRef = ref)} />
    </QueryClientProvider>
  );
}

export default MyApp;
