import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { SelectionToCartTable } from '~/components/common/SelectionToCartTable';
import Cleaning from '../products/cleaning.json'
import Confectionery from '../products/confectionery.json'
import Consumables from '../products/consumables.json'
import Drinks from '../products/drinks.json'
import Snacks from '../products/snacks.json'
import TobbacoItems from '../products/tobacco_items.json'
import type { BoxItem, ItemType } from '~/types/ItemModel';
import { ConvertObjectsToBoxItems, ConvertObjectsToPackageItems } from '~/components/utils/ConvertToItem';
export const Catalog = () => {
    
    const boxHeaders = ["Artigo","Quantidade","Unitário","Caixa","Iva"]
    const packageHeaders = ["Artigo","Quantidade","Preço","Iva"]
    // const productTypes: string[] = ["Confeitaria","Snacks", "Bebidas","Tabacaria", "Consumíveis", "Limpezas"]
    const productTypesAndContent = [
        {
            title: "Confeitaria",
            tabs: ["Chocolates", "Doces","Pastilhas"],
            contents: [
                {
                    headers: boxHeaders,
                    source: ConvertObjectsToBoxItems(Confectionery.chocolates),
                    type: "BOX" as ItemType
                }, 
                {
                    headers: boxHeaders,
                    source: ConvertObjectsToBoxItems(Confectionery.candies),
                    type: "BOX" as ItemType
                },
                {
                    headers: boxHeaders,
                    source: ConvertObjectsToBoxItems(Confectionery.gums),
                    type: "BOX" as ItemType
                },
            ]
        },
        {
            title: "Snacks",
            tabs: ["Batatas Fritas", "Snacks"],
            contents: [
                {
                    headers: boxHeaders,
                    source: ConvertObjectsToBoxItems(Snacks.chips),
                    type: "BOX" as ItemType
                },
                {
                    headers: boxHeaders,
                    source: ConvertObjectsToBoxItems(Snacks.bars_and_biscuits),
                    type: "BOX" as ItemType
                },
            ]
        },
        {
            title: "Bebidas",
            tabs: ["Sumos", "Energéticos","Águas","Leite","Cervejaria", "Destiladas",],
            contents: [
                {
                    headers: boxHeaders,
                    source: ConvertObjectsToBoxItems(Drinks.juices_and_sodas),
                    type: "BOX" as ItemType
                },
                {
                    headers: boxHeaders,
                    source: ConvertObjectsToBoxItems(Drinks.energy_drinks),
                    type: "BOX" as ItemType
                },
                {
                    headers: boxHeaders,
                    source: ConvertObjectsToBoxItems(Drinks.water),
                    type: "BOX" as ItemType
                },
                {
                    headers: boxHeaders,
                    source: ConvertObjectsToBoxItems(Drinks.milk),
                    type: "BOX" as ItemType
                },
                {
                    headers: boxHeaders,
                    source: ConvertObjectsToBoxItems(Drinks.beers),
                    type: "BOX" as ItemType
                },
                {
                    headers: packageHeaders,
                    source: ConvertObjectsToPackageItems(Drinks.wines_and_spirits),
                    type: "PACKAGE" as ItemType 
                },
            ]
        },
        {
            title: "Tabacaria",
            tabs: ["Isqueiro", "Mortalhas","Filtros","Acessórios"],
            contents: [
                {
                    headers: boxHeaders,
                    source: ConvertObjectsToBoxItems(TobbacoItems.lighters),
                    type: "BOX" as ItemType
                },
                {
                    headers: boxHeaders,
                    source: ConvertObjectsToBoxItems(TobbacoItems.rolling_papers),
                    type: "BOX" as ItemType
                },
                {
                    headers: boxHeaders,
                    source: ConvertObjectsToBoxItems(TobbacoItems.filters),
                    type: "BOX" as ItemType
                },
                {
                    headers: boxHeaders,
                    source: ConvertObjectsToBoxItems(TobbacoItems.accessories),
                    type: "BOX" as ItemType
                },
            ]
        },
        {
            title: "Consumíveis",
            tabs: ["Papel", "Sacos do Lixo","Descartáveis"],
            contents: [
                {
                    headers: packageHeaders,
                    source: ConvertObjectsToPackageItems(Consumables.paper_and_napkins),
                    type: "PACKAGE" as ItemType 
                },
                {
                    headers: packageHeaders,
                    source: ConvertObjectsToPackageItems(Consumables.garbage_bags),
                    type: "PACKAGE" as ItemType 
                },
                {
                    headers: packageHeaders,
                    source: ConvertObjectsToPackageItems(Consumables.disposables_and_packaging),
                    type: "PACKAGE" as ItemType 
                },
            ]
        },
        {
            title: "Limpeza",
            tabs: ["Productos Limpeza"],
            contents: [
                {
                    headers: packageHeaders,
                    source: ConvertObjectsToPackageItems(Cleaning.cleaning_products) ,
                    type: "PACKAGE" as ItemType 
                },
            ]
        }
    ]
    return (
        <div className="tabs tabs-box">
            {productTypesAndContent.map(content => 
                <>
                    <input type="radio" name="my_tabs_6" className="tab" aria-label={content.title} />
                    <div className="tab-content bg-base-100 border-base-300 ">
                        <Tabs>
                            <TabPanel>
                                <Tabs forceRenderTabPanel>
                                    <TabList>
                                        {content.tabs.map(tab => 
                                            <Tab>{tab}</Tab>
                                        )}
                                    </TabList>
                                    {content.contents.map(content => 
                                        <TabPanel>
                                            <SelectionToCartTable headers={content.headers} source={content.source} type={content.type}/>
                                        </TabPanel>
                                    )}
                                </Tabs>
                            </TabPanel>
                        </Tabs>
                    </div>
                </>
            )}
        </div>
        // <Tabs forceRenderTabPanel defaultIndex={0}  >
        //     <TabList>
        //         {productTypes.map(productType => 
        //             <Tab>{productType}</Tab>
        //         )}
        //     </TabList>
        //     {subProductTypesAndContent.map(subProdType => 
        //         <TabPanel>
        //             <Tabs forceRenderTabPanel>
        //                 <TabList>
        //                     {subProdType.tabs.map(tab => 
        //                         <Tab>{tab}</Tab>
        //                     )}
        //                 </TabList>
        //                 {subProdType.contents.map(content => 
        //                     <TabPanel>
        //                         <SelectionToCartTable headers={content.headers} source={content.source} type={content.type}/>
        //                     </TabPanel>
        //                 )}
        //             </Tabs>
        //         </TabPanel>
        //     )}
        // </Tabs>
    )
}