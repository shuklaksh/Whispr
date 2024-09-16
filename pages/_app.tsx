import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {
  return (
  <div className={inter.className}>
    <GoogleOAuthProvider clientId="155564876077-ckvi689oasumnceskh1lfs6mtee5neqe.apps.googleusercontent.com">
      <Component {...pageProps} />
      <Toaster />
    </GoogleOAuthProvider >
    </div>
)}
