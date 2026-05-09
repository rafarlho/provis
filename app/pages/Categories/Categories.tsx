import { useCallback, useEffect } from "react";
import { GiChocolateBar  } from "react-icons/gi";
import { GiFrenchFries } from "react-icons/gi";
import { GiBeerBottle } from "react-icons/gi";
import { GiLighter } from "react-icons/gi";
import { GiFoldedPaper } from "react-icons/gi";
import { GiVacuumCleaner } from "react-icons/gi";
import { useNavigate } from "react-router";
import client from "~/api/client";
export const Categories = () => {

    const navigate = useNavigate()
    const getCategories = useCallback( async () => {

        const { data, error } = await client.from('Category').select('*')
        console.log(data,error)
    },[])

    useEffect(()=> {
        getCategories()
    },[getCategories])


    const categories = [
        {
            name:"Confeitaria",
            description:"Confeitaria description",
            icon: <GiChocolateBar />,
            navigateTo:"category/confectionery"
        },
        {
            name:"Snacks",
            description:"Snacks description",
            icon: <GiFrenchFries/>,
            navigateTo:"category/snacks"
        },
        {
            name:"Bebidas",
            description:"Bebidas description",
            icon: <GiBeerBottle/>,
            navigateTo:"category/drinks"
        },
        {
            name:"Tabacaria",
            description:"Tabacaria description",
            icon: <GiLighter/>,
            navigateTo:"category/tobacco"
        },
        {
            name:"Consumíveis",
            description:"Consumíveis description",
            icon: <GiFoldedPaper/>,
            navigateTo:"category/consumables"
        },
        {
            name:"Limpezas",
            description:"Limpezas description",
            icon: <GiVacuumCleaner/>,
            navigateTo:"category/cleaning"
        }
    ]

    return(<>
        <div className="flex flex-wrap gap-2 items-center justify-center cursor-pointer">
            {categories.map(category => (
                <div className="card bg-base-100 w-100 shadow-sm border border-(--color-secondary)!" onClick={()=> navigate(category.navigateTo)}>
                    <figure className="px-10 pt-10 text-5xl text-(--color-primary)">
                        {category.icon}
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title underline decoration-(--color-secondary) text-(--color-primary)">{category.name}</h2>
                        <p>{category.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </>)
}