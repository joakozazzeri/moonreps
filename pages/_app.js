import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Bebas_Neue, Space_Grotesk, DM_Mono } from "next/font/google";
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Scroll to top on every route change
  useEffect(() => {
    const handle = () => window.scrollTo({ top: 0, behavior: 'instant' });
    router.events.on('routeChangeComplete', handle);
    return () => router.events.off('routeChangeComplete', handle);
  }, [router.events]);

  return (
    <div className={`${bebasNeue.variable} ${spaceGrotesk.variable} ${dmMono.variable} font-sans`}>
      <div className="page-transition" key={router.asPath}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}
