import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <div className="page-transition" key={router.asPath}>
      <Component {...pageProps} />
    </div>
  );
}
