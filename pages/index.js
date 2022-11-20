import Head from "next/head";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth-context";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    isAuthenticated ? router.push("/dashboard") : router.push("/login");
  }, []);
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
    </>
  );
}
