import { useState } from "react";
import styles from "./card.module.css"

import fav from "../../../../assets/heartFull.svg"
import { FavouriteCard } from "../../../../common/interface/hotelInterface";
import Button from "../../../../common/el/button/button";
import { useNavigate } from "react-router-dom";
import { changefavourite } from "../../../../common/service/hotelService";

export default function FavCard({hotel}:{hotel:FavouriteCard}){
    const [favf, setFavf] = useState<boolean>(true);
    const navigator = useNavigate();

    function gotoHotel(){
        navigator(`/hotel/?id=${hotel.id}`);
    }
    function togglefav(){
        let token = localStorage.getItem('travelToken');
        token ? changefavourite(token, hotel.id).then((response)=>{setFavf(!favf)}) : alert("Пользователь не авторизован");
    }

    return(
        favf ? 
            <div className={styles.card}>
                <img className={styles.view} src={hotel.base64} alt="preview"/>
                <div className={styles.cardOther}>
                    <h2>{hotel.name} {hotel.price}$</h2>
                    <p>{(hotel.description)}</p>
                    <div className={styles.buttonWrapper}>
                        <Button text="Подробнее" func={gotoHotel}/>
                        <img onClick={togglefav} className={styles.lovedornot} src={fav} alt="favheart"/>
                    </div>
                </div>
            </div>
        :
            <></>
    )
}