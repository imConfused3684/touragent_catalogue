import { useParams } from "react-router-dom";
import styles from "./hotelPage.module.css"
import { useEffect, useState } from "react";

import fav from "../../assets/heartFull.svg"
import notfav from "../../assets/heartEmpty.svg"
import upArr from "../../assets/arrUp.svg"
import downArr from "../../assets/arrDown.svg"
import { Hotel } from "../../common/interface/hotelInterface";
import { changefavourite, getById, isfavourite } from "../../common/service/hotelService";
import { tokencheck } from "../../common/service/userService";
import SeviceCard from "../../common/el/serviceCard/serviceCard";

function MainInfo({hotel}:{hotel: Hotel["aHotel"]}){
    const [logged, setLogged] = useState<boolean>(false);
    const [favf, setFavf] = useState<boolean>(false);
    const token = localStorage.getItem('travelToken');

    function togglefav(){
        token ? changefavourite(token, hotel.id).then(()=>{setFavf(!favf)}) : alert("Пользователь не авторизован");
    }

    useEffect(()=>{
        token ? tokencheck(token).then((response)=>{
            if(response.adm === undefined){
                localStorage.removeItem('travelToken');
            }
            else{
                if(token){
                    isfavourite(token, hotel.id).then((response)=>{
                        response.flag !== undefined ? setFavf(response.flag != 0) : localStorage.removeItem('travelToken');
                    });
                    
                }
                setLogged(true);
            }
        }) : {};
    }, []);

    return(
        <div className={styles.mainInfo}>
                <h1 className={styles.hotelh1}>{hotel.name}</h1>
                <div className={styles.infoWrapper}>
                    <p className="price">1 сутки: {hotel.price}$</p>
                    <p className="rating">Рейтинг: {hotel.rating}</p>
                    {
                        logged ? 
                        <>
                            <img onClick={togglefav} className={styles.arrow} src={upArr} alt="favup"/>
                            <img onClick={togglefav} className={styles.arrow} src={downArr} alt="favdown"/>
                        </>
                        : <></>
                    }
                </div>
                {
                    logged 
                    ?
                        <div className={styles.buttonWrapper}>
                            <img onClick={togglefav} src={favf ? fav : notfav} alt="favheart"/>
                        </div>
                    :
                    <></>
                }
                <img className={styles.hotelImage} src={hotel.base64} alt="hotelImage"/>
                <p className={styles.description}>{hotel.description}</p>
        </div>
    )
}

export default function HotelPage(){
    const [hotel, setHotel] = useState<React.ReactElement>(<div style={{color: "var(--main-color)", fontSize: "30px", textAlign: "center", paddingTop: "30vh"}}>Данные загружаются</div>);
    const [services, setServices] = useState<React.ReactElement>(<></>);
    let { id } = useParams();

    useEffect(()=>{
        getById(Number(id)).then((data)=>{
            setHotel(<MainInfo hotel={data["aHotel"]} />);
            setServices(<>{
                data["aServices"].map((card)=>{
                    return <SeviceCard key={card.ser_id} 
                        name={card.name} 
                        description={(card.ser_id == 0 ? card.description + `\nТип:${data["aHotel"].typeName}\nПитание:${data["aHotel"].feedName}${data["aHotel"].nearWater == 1 ? '\nУ воды' : ''}` : card.description).split('\n')}
                    />
                })
            }</>)
        });
    }, []);

    return(
        <div className={styles.outerWrapper}>
            {hotel}
            <div className={styles.serviceInfo}>
                {services}
            </div>
        </div>
    )
}