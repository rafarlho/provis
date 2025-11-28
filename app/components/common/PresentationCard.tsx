export const PresentationCard = (
    { icon, title, content, button }: {
        icon: React.ReactNode;
        title: string;
        content: string;
        button?: React.ReactNode
    }
) => {

    return(
        <div className="card bg-none border-0 text-center items-center">
            <figure>
                {icon}
            </figure>
            <div className="card-body p-0">
                <h2 className="card-title justify-center">{title}</h2>
                <p>{content}</p>
                {button &&
                <div className="card-actions justify-center">
                    {button}
                </div>}
            </div>
        </div>
    )
}

export default PresentationCard;