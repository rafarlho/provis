import type { Route } from "../+types/root";
import { LandingPage } from "../pages/LandingPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Provis Global" },
    { name: "description", content: "Welcome to Provis Global!" },
  ];
}

export default function Home() {
  return <LandingPage />;
}
