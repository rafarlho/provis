export const PresentationCard = (
    { icon, title, content }: {
        icon: React.ReactNode;
        title: string;
        content: string;
    }
) => {

    return(
        <div className="card bg-none border-0 text-center">
            <figure>
                {icon}
            </figure>
            <div className="card-body">
                <h2 className="card-title justify-center">{title}</h2>
                <p>{content}</p>
                {/* <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div> */}
            </div>
        </div>
    )
}

export default PresentationCard;