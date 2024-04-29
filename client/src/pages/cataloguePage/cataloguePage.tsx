import styles from "./cataloguePage.module.css";
import { useEffect, useState } from "react";

import Button from "../../common/el/button/button"
import Selector from "../../common/el/selector/selector"
import WaterCheck from "../../common/el/checkbox/checkbox"
import Searchbar from "./el/searchbar/searchbar"
import BudgetBar from "./el/budgetbar/budgetbar"
import { getAll } from "../../common/service/hotelService";
import Card from "./el/catalogCard/card";

export default function Catalogue() {
    const [typeSelector, setTypeSelector] = useState<string>("-1");
    const [feedTypeSelector, setFeedTypeSelector] = useState<string>("-1");
    const [sortSelector, setSortSelector] = useState<string>("-1");
    const [ratingSelector, setRatingSelector] = useState<string>("-1");
    const [watercheck, setWatercheck] = useState<string>("0");
    const [search, setSearch] = useState<string>("");
    const [budget, setBudget] = useState<number>(1000);

    const [cards, setCards] = useState<React.ReactElement>(<div style={{color: "var(--main-color)", fontSize: "30px"}}>Данные загружаются</div>);
    useEffect(()=>{
        getAll().then((data)=>{setCards(<>{ 
            data.map((card, index)=>{return <Card key={index} data={card} />})
        }</>)})
    },[])

    return (
        <>
            <h1 className={styles.catalogueh1}>Отели</h1>

            <div className={styles.filterPart}>
                <div className={styles.filterRow}>

                    <Searchbar valueHook={setSearch}/>

                    <Selector 
                        colorFlag={true} 
                        options={[
                                {value:"-1", name:"Тип отеля"},
                                {value:"-1", name:"Любой"},
                                {value:"1", name:"Отель"},
                                {value:"2", name:"Гостевой дом"},
                                {value:"3", name:"Апартаменты"},
                                {value:"4", name:"Вилла"}
                        ]}
                        stateHookFunc={setTypeSelector}
                    />

                    <Selector 
                        colorFlag={true} 
                        options={[
                            {value:"-1", name:"Питание"},
                            {value:"-1", name:"Любое"},
                            {value:"1", name:"Нет"},
                            {value:"2", name:"Только завтрак"},
                            {value:"3", name:"Завтрак, ужин"},
                            {value:"4", name:"Полное"}
                        ]}
                        stateHookFunc={setFeedTypeSelector}
                    />

                    <Selector 
                        colorFlag={true} 
                        options={[
                                {value:"-1", name:"Сортировать по"},
                                {value:"1", name:"Сортировать по цене"},
                                {value:"2", name:"Сортировать по рейтингу"}
                        ]}
                        stateHookFunc={setSortSelector}
                    />
                </div>
                <div className={styles.filterRow}>
                    <BudgetBar value={budget} valueHook={setBudget}/>

                    <Selector 
                        colorFlag={true} 
                        options={[
                           {value:"-1", name: "Рейтинг"},
                           {value:"-1", name: "Любой"},
                           {value:"3", name: "3.0 и более"},
                           {value:"3.5", name: "3.5 и более"},
                           {value:"4", name: "4.0 и более"},
                           {value:"4.5", name: "4.5 и более"}
                        ]}
                        stateHookFunc={setRatingSelector}
                    />

                    <WaterCheck text="У воды" func={setWatercheck}/>
                    <button onClick={()=>{}}>Применить</button>
                </div>
            </div>

            <div className={styles.cardsPart}>
            {
                cards
            }
                    
            </div>
            <div className={styles.moreButtonWrapper}>
                    <Button text="Показать больше" func={()=>{}}/>
            </div>
        </>
    );
}