import PresentationCard from "./common/PresentationCard";
import RotatingText from "./common/RotatingText"
import { GiVacuumCleaner } from "react-icons/gi";
import { MdLocalShipping } from "react-icons/md";
import { MdGavel } from "react-icons/md";
import { LuClipboardPen } from "react-icons/lu";
import SpotlightCard from "./common/SpotlightCard";

export function IntroductionContent() {
    return(<>
        <div className="absolute h-[30dvh] w-[40dvw] right-0 bg-(--color-secondary) z-49 rounded-bl-[100%]"></div>
        <div className="absolute h-[20dvh] w-[70dvw] -top-10 right-0 bg-(--color-primary) z-50 rounded-bl-[100%]"></div>
        <div className="flex h-dvh w-dvw relative flex-col justify-center gap-20">
            <div className="flex items-center gap-25 px-10 lg:flex-row">
                <img src="/logo.png" alt="Provis logo" className="h-40 w-auto"/>
                <div>
                    <RotatingText
                        texts={['Distribuição', 'Serviços de Limpeza', 'Auditoria de HACCP', 'Solicitadoria']}
                        mainClassName="px-2 sm:px-2 md:px-3 bg-(--color-primary) text-(--color-white)! font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg text-4xl!"
                        staggerFrom={"last"}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={2500}
                    />
                </div>
            </div>
            <div className="flex justify-between px-25 flex-wrap">
                <SpotlightCard spotlightColor="rgba(82, 184, 182, 0.4)" className="w-[20%] min-w-50 bg-white p-5! border-(--color-custom-teal)!"><PresentationCard icon={<MdLocalShipping  color="var(--color-custom-teal)" size={50} />} title={"Distribuição"} content={"Alimentar, Horeca, Limpeza e Tabacaria com eficiência e pontualidade."} key={"Distribuição"} /></SpotlightCard>
                <SpotlightCard spotlightColor="rgba(166, 195, 14, 0.4)" className="w-[20%] min-w-50 bg-white p-5! border-(--color-custom-lime)!"><PresentationCard icon={<GiVacuumCleaner color="var(--color-custom-lime)" size={50} />} title={"Serviços de Limpeza"} content={"Soluções de limpeza profissionais adaptadas às suas necessidades."} key={"Serviços de Limpeza"} /></SpotlightCard>
                <SpotlightCard spotlightColor="rgba(225, 61, 64, 0.4)" className="w-[20%] min-w-50 bg-white p-5! border-(--color-custom-red)!"><PresentationCard icon={<LuClipboardPen color="var(--color-custom-red)" size={50} />} title={"Auditoria de HACCP"} content={"Garantimos a segurança alimentar do seu estabelecimento."} key={"Auditoria de HACCP"} /></SpotlightCard>
                <SpotlightCard spotlightColor="rgba(116, 75, 151, 0.4)" className="w-[20%] min-w-50 bg-white p-5! border-(--color-custom-purple)!"><PresentationCard icon={<MdGavel color="var(--color-custom-purple)" size={50} />} title={"Solicitadoria"} content={"Aconselhamento Jurídico-Financeiro de confiança."} key={"Solicitadoria"} /></SpotlightCard>
            </div>
        </div>
    </>)
}