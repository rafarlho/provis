import PresentationCard from "../../components/common/PresentationCard";
import RotatingText from "../../components/common/RotatingText"
import { GiVacuumCleaner } from "react-icons/gi";
import { MdLocalShipping } from "react-icons/md";
import { MdGavel } from "react-icons/md";
import { LuClipboardPen } from "react-icons/lu";
import SpotlightCard from "../../components/common/SpotlightCard";
import { useNavigate } from "react-router";
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from "react";

export function IntroductionContent() {
    const navigate = useNavigate();

    const services = [
        {
            id: 1,
            title: "Distribuição",
            content: "Alimentar, Horeca, Limpeza e Tabacaria com eficiência e pontualidade.",
            icon: <MdLocalShipping color="var(--color-custom-teal)" size={50} />,
            borderColor: "border-(--color-custom-teal)!",
            button: () => (<button className="btn bg-(--color-custom-teal) border-0 text-white" onClick={()=>navigate("/provis")}>Ver catálogo</button>)
        },
        {
            id: 2,
            title: "Serviços de Limpeza",
            content: "Soluções de limpeza profissionais adaptadas às suas necessidades.",
            icon: <GiVacuumCleaner color="var(--color-custom-lime)" size={50} />,
            borderColor: "border-(--color-custom-lime)!",
            button: null
        },
        {
            id: 3,
            title: "Auditoria de HACCP",
            content: "Garantimos a segurança alimentar do seu estabelecimento.",
            icon: <LuClipboardPen color="var(--color-custom-purple)" size={50} />,
            borderColor: "border-(--color-custom-purple)!",
            button: null
        },
        {
            id: 4,
            title: "Solicitadoria",
            content: "Aconselhamento Jurídico-Financeiro de confiança.",
            icon: <MdGavel color="var(--color-custom-red)" size={50} />,
            borderColor: "border-(--color-custom-red)!",
            button: null
        }
    ]

    const isSmallScreen = useMediaQuery({ maxWidth: 1023 })
    const [activeIndex, setActiveIndex] = useState(1)

    useEffect(() => {
        if (!isSmallScreen) return

        const interval = setInterval(() => {
            setActiveIndex((current) => {
                const nextIndex = current === services.length ? 1 : current + 1
                window.location.hash = `#item${nextIndex}`
                return nextIndex
            });
        }, 5000)

        return () => clearInterval(interval)
    }, [isSmallScreen]);
    
    const CarouselComponent = (
        <>
            <div className="carousel w-full">
                {services.map((service) => (
                    <div
                        id={`item${service.id}`}
                        key={service.id}
                        className="carousel-item w-full flex justify-center"
                    >
                        <SpotlightCard
                            key={service.id}
                            spotlightColor={service.id === 1 ? 'rgba(82, 184, 182, 0.4)' : service.id === 2 ? 'rgba(166, 195, 14, 0.4)' : service.id === 3 ? 'rgba(116, 75, 151, 0.4)' : 'rgba(225, 61, 64, 0.4)'}
                            className={`w-full min-w-50 bg-white p-5! ${service.borderColor} mx-2 max-w-sm`}
                        >
                            <PresentationCard
                                icon={service.icon}
                                title={service.title}
                                content={service.content}
                                button={service.button ? service.button() : undefined}
                            />
                        </SpotlightCard>
                    </div>
                ))}
            </div>
        </>
    );

    const GridComponent = (
        <div className="flex justify-between px-25 flex-wrap">
            {services.map((service) => (
                <SpotlightCard
                    key={service.id}
                    spotlightColor={service.id === 1 ? 'rgba(82, 184, 182, 0.4)' : service.id === 2 ? 'rgba(166, 195, 14, 0.4)' : service.id === 3 ? 'rgba(116, 75, 151, 0.4)' : 'rgba(225, 61, 64, 0.4)'}
                    className={`w-[20%] min-w-50 bg-white p-5! ${service.borderColor}`}
                >
                    <PresentationCard
                        icon={service.icon}
                        title={service.title}
                        content={service.content}
                        button={service.button ? service.button() : undefined}
                    />
                </SpotlightCard>
            ))}
        </div>
    );

    return(<>
        <div className="absolute h-[10dvh] w-[40dvw]  xl:h-[25dvh] xl:w-[40dvw] right-0 bg-(--color-secondary) z-49 rounded-bl-[100%]"></div>
        <div className="absolute h-[10dvh] w-[70dvw] xl:h-[15dvh] xl:w-[70dvw] -top-10 right-0 bg-(--color-primary) z-50 rounded-bl-[100%]"></div>
        <div className="flex h-dvh w-dvw relative flex-col justify-center gap-10 lg:gap-20">
            <div className="flex items-center gap-10 lg:gap-25  px-10 flex-col lg:flex-row">
                <img src="/logo.png" alt="Provis logo" className="h-20 lg:h-40 w-auto"/>
                <div>
                    <RotatingText
                        texts={['Distribuição', 'Serviços de Limpeza', 'Auditoria de HACCP', 'Solicitadoria']}
                        mainClassName="px-2 sm:px-2 md:px-3 bg-(--color-primary) text-(--color-white)! font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg md:text-4xl!"
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
            {isSmallScreen ? CarouselComponent : GridComponent}
        </div>
    </>)
}