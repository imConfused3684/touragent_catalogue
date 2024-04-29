import { RefObject } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./modal.module.css"
import Button from "../../../../common/el/button/button";

import fav from "../../../../assets/heartFull.svg"
import notfav from "../../../../assets/heartEmpty.svg"

import { Hotel } from "../../../../common/interface/hotelInterface";

interface Props{
    hotel: Hotel["aHotel"];

    isFavourite: number;

    modalref: RefObject<HTMLDialogElement>;
}

export default function Modal({hotel, isFavourite, modalref}:Props) {
    const navigator = useNavigate();

    function gotoHotel(){
        navigator(`/hotel/?id=${hotel.id}`);
    }

    return (
        <dialog ref={modalref}>
            <div className={styles.modal}>
                <span className={styles.close} onClick={()=>{modalref.current?.close()}}>&times;</span>
                <div>
                    <div className={styles.UpMod}>
                        <img className={styles.bigguy} src={hotel.base64} alt="view"/>
                        <div className={styles.infoDiv}>
                            <h2>{hotel.name}</h2>
                            <h2>{hotel.price}</h2>
                            <p>Тип: {hotel.typeName} </p> 
                            <p>Питание: {hotel.feedName}</p>
                            <p>{hotel.nearWater == 1 ? "У воды" : null}</p>
                            <p>Рейтинг: {hotel.rating}</p>
                        </div>
                    </div>
                    <div className={styles.other}>
                        <p style={{margin: "10px 0"}}>{hotel.description}</p>
                        <div className={styles.buttonWrapper}>
                            <Button text="Перейти" func={()=>gotoHotel()}/>
                        </div>
                        {
                            isFavourite == -1 ? null : <img className={styles.lovedornot}src={isFavourite == 0 ? notfav : fav} alt="lovedlike"/>
                        }
                    </div>
                </div>
            </div>
            
        </dialog>
    );
}