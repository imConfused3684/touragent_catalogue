import { useRef, useState, useEffect } from "react";
import { CatalogueCard } from "../../../../common/interface/hotelInterface"
import { getById, isfavourite } from "../../../../common/service/hotelService";
import Modal from "../modal/modal";
import styles from "./card.module.css"
import Button from "../../../../common/el/button/button";

export default function Card({data}:{data: CatalogueCard}){
    const ref = useRef<HTMLDialogElement>(null);

    async function modal(id: number):Promise<React.ReactElement>{
        const hotel = (await getById(id)).aHotel;

        const token = localStorage.getItem('travelToken');
        const isfav: number = token ? (await isfavourite(token, id)).flag : -1;

        return <Modal hotel={hotel} isFavourite={isfav} modalref={ref}  />
    }

    const [mod, setMod] = useState<React.ReactElement>(<></>);
    useEffect(()=>{ref.current?.show();}, [mod]);

    return(
        <div className={styles.card}>
            <img src={data.base64} className={styles.cardimg}/>
            <div className={styles.cardinfo}>
                <p className={styles.name}>{data.name}</p>
                <div className={styles.infoWrapper}>
                    <p>{data.price}$</p>
                    <p>{data.rating}</p>
                </div>
            </div>
            <div className={styles.buttonWrapper}>
                <Button text="Подробнее" func={()=>{modal(data.id).then((modal)=>{setMod(modal)})}}/>
            </div>
            {mod}
        </div>
    )
}