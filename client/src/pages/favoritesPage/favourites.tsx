import styles from "./favourites.module.css"
import Button from "../../common/el/button/button"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { tokencheck } from "../../common/service/userService";
import { getLovedHotelByUserId } from "../../common/service/hotelService";
import FavCard from "./el/favCard/card";

export default function FavouritesPage(){
    const navigator = useNavigate();
    const[admin, setAdmin] = useState<boolean>(false);
    const[cards, setcards] = useState<React.ReactElement>(<div style={{color: "var(--main-color)", fontSize: "30px", paddingTop: "20vh"}}>Данные загружаются</div>);

    useEffect(()=>{
        const token = localStorage.getItem('travelToken');
        if(token){
            tokencheck(token).then((response)=>{
                if(response.adm === undefined){
                    signout();
                }
                else{
                    setAdmin(response.adm == 1);
                }
            });

            getLovedHotelByUserId(token).then((data)=>{
                setcards(<>
                    {
                        data.map((card, index)=>{return <FavCard key={index} hotel={card} />})
                    }
                </>)
            });
        }
        else{
            navigator("/catalogue");
        }
    },[]);

    function signout(){
        localStorage.removeItem('travelToken');
        navigator("/catalogue");
    }

    return(
        <div className={styles.outerWrapper}>
            <h1 className={styles.favh1}>Понравившееся предложения</h1>
            <div className={styles.buttonbox}>
                <Button text="Выйти" func={signout} />
                {
                    admin ? <Button text="Добавить" func={()=>{navigator("/add")}} /> : null
                }
            </div>
            <div className={styles.cardbox}>
                {
                    cards
                }
            </div>
        </div>
    )
}