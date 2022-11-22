import { useRouter } from "next/router";
import { useEffect } from "react";
import Dashboard from "../components/home/Dashboard";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    token ? router.push("/") : router.push("/login");
  }, []);
  return <Dashboard />;
}
