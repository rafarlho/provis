import { IntroductionContent } from "~/pages/LandingPage/IntroductionContent";
import type { Route } from "../+types/root";
import { Footer } from "~/components/common/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Provis Global" },
  ];
}

export default function Home() {
  return (
      <main className="flex flex-col h-full w-full overflow-auto">
        <IntroductionContent/>
        <Footer/>
      </main>
    )
}