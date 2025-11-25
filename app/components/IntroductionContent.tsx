import RotatingText from "./common/RotatingText" 
export function IntroductionContent() {
    return(<>
        <div className="absolute h-[30dvh] w-[40dvw] right-0 bg-(--color-secondary) z-49 rounded-bl-[100%]"></div>
        <div className="absolute h-[20dvh] w-[70dvw] -top-10 right-0 bg-(--color-primary) z-50 rounded-bl-[100%]"></div>
        <div className="flex h-dvh w-dvw relative flex-col justify-center">
            <div className="flex">
                <p>Provis</p>
                <RotatingText
                    texts={['Distribuição', 'Serviços de Limpeza', 'Auditoria de Haccp', 'Solicitadoria']}
                    mainClassName="px-2 sm:px-2 md:px-3 bg-(--color-primary) text-(--color-white)! font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={5000}
                />
            </div>
            <div className="flex justify-self-end">
                whas
            </div>
        </div>
    </>)
}