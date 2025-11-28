import { Footer } from "~/components/common/Footer";
import { IntroductionContent } from "~/components/IntroductionContent";

export function LandingPage() {
  return (
    <main className="flex flex-col h-full w-full overflow-auto">
      <IntroductionContent/>
      <Footer></Footer>
    </main>
  );
}
