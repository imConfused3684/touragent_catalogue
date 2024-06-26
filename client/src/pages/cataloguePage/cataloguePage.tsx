import styles from "./cataloguePage.module.css";
import { useEffect, useState } from "react";

import Button from "../../common/el/button/button"
import Selector from "../../common/el/selector/selector"
import WaterCheck from "../../common/el/checkbox/checkbox"
import Searchbar from "./el/searchbar/searchbar"
import BudgetBar from "./el/budgetbar/budgetbar"
import { getAll, getFiltered } from "../../common/service/hotelService";
import Card from "./el/catalogCard/card";

export default function Catalogue() {
    const plug: React.ReactElement = <div style={{color: "var(--main-color)", fontSize: "30px", padding: "10vh 0"}}>Данные загружаются</div>;

    const [typeSelector, setTypeSelector] = useState<number>(-1);
    const [foodTypeSelector, setFoodTypeSelector] = useState<number>(-1);
    const [sortSelector, setSortSelector] = useState<number>(-1);
    const [ratingSelector, setRatingSelector] = useState<number>(-1);
    const [watercheck, setWatercheck] = useState<number>(0);
    const [search, setSearch] = useState<string>("");
    const [budget, setBudget] = useState<number>(1000);
    const [limit, setLimit] = useState<number>(0);

    const [cards, setCards] = useState<React.ReactElement>(plug);
    const [show, setShow] = useState<boolean>(false);
    useEffect(()=>{
        filter(0);
    },[])
    
    function filter(nLimit: number){
        getFiltered(search, typeSelector, foodTypeSelector, sortSelector, budget, ratingSelector, watercheck, nLimit)
            .then((data)=>{
                if(data.cards.length > 0){
                    setCards(
                        <>
                            {nLimit == 0 ? <></> : cards}
                            {data.cards.map((card, index) => <Card key={index} data={card} />)}
                        </>
                    );
                    data.showmore > 0 ? setShow(true) : setShow(false);
                }
                else{
                    setCards(<div style={{color: "var(--main-color)", fontSize: "30px", padding: "10vh 0"}}>Ничего не найдено</div>);
                    setShow(false);
                }
            })
    }

    //useEffect(()=>{filter(limit) },[limit])

    return (
        <>
            <h1 className={styles.catalogueh1}>Отели</h1>

            <div className={styles.filterPart}>
                <div className={styles.filterRow}>

                    <Searchbar valueHook={setSearch}/>

                    <Selector 
                        colorFlag={true} 
                        options={[
                                {value:"-1", name:"Тип объекта"},
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
                        stateHookFunc={setFoodTypeSelector}
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
                    <button onClick={()=>{filter(0); setLimit(0);}}>Применить</button>
                </div>
            </div>

            <div className={styles.cardsPart}>
                {
                    cards
                }
            </div>
            <div className={styles.moreButtonWrapper}>
                {show ? <Button text="Показать больше" func={()=>{filter(limit+3); setLimit(limit+3);}}/> : <></>}
            </div>
        </>
    );
}