import { ThemeProvider } from "next-themes";
import "../css/tailwind.css";
import Layout from "@/components/layout/layout";
import { BrowserRouter } from "react-router-dom";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
