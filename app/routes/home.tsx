import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Provis Global" },
    { name: "description", content: "Welcome to Provis Global!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
