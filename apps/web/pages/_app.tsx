import type { AppProps } from "next/app";
import { useEffect } from "react";
import { ModalWrapper, AuthProvider } from "ui";
import { Modal } from "ui";
import { Layout } from "../components/organism";
import { QueryClient, QueryClientProvider } from "react-query";

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
          <ModalWrapper ref={(ref) => (modalRef = ref)} />
        </Layout>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
