import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
export const Footer = () => {

    return (
        <footer className="footer sm:footer-horizontal bg-base-200 text-base-content gap-0 md:gap-2.5 p-5 lg:p-10 ">
        <aside>
            <small>© {new Date().getFullYear()} Provis Global, Todos os direitos reservados.</small>
        </aside>
        <nav>
            <a className="link link-hover flex gap-1 items-center" href="https://api.whatsapp.com/send?phone=351969058981&text=Olá, quero obter mais informações sobre a Provis!" target="_blank"><FaWhatsapp /> 969058981</a>
        </nav>
        <nav>
            <a className="link link-hover flex gap-1 items-center" href="mailto:geral@provis.pt?subject=Pedido%20de%20Informação&body=Olá,%0A%0AGostaria%20de%20saber%20mais%20sobre%20a%20Provis." target="_blank"><MdOutlineEmail /> geral@provis.pt</a>
        </nav>
        
        </footer>
    )
}