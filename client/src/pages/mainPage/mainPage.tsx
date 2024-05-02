import styles from "./mainPage.module.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import Button from "../../common/el/button/button"

import mainOcean from "../../assets/mainOcean.jpg"
import mainRocks from "../../assets/mainRocks.jpg"
import mainPalms from "../../assets/mainPalms.jpg"
import mainTurtle from "../../assets/mainTurtle.png"
import pointimg from "../../assets/checkblue.png"



export default function Main() {
    const [sliderIndex, setsliderIndex] = useState<number>(0);
    const [mobileFlag, setmobileFlag] = useState<boolean>(false);

    useEffect(()=>{
        setmobileFlag(window.innerWidth >= 500);
        setTimeout(() => {
            setsliderIndex((sliderIndex + 1)%4);
          }, 4000);
    },[sliderIndex])

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.mainh1}>Traveling Around</h1>

            <div className={styles.adimg}>
                <img style={sliderIndex != 0 ? {display: "none"} : {}} src={mainTurtle} alt="mainImage" />
                <img style={sliderIndex != 1 ? {display: "none"} : {}} src={mainPalms} alt="mainImage" />
                <img style={sliderIndex != 2 ? {display: "none"} : {}} src={mainRocks} alt="mainImage" />
                <img style={sliderIndex != 3 ? {display: "none"} : {}} src={mainOcean} alt="mainImage" />
            </div>

            <div className={mobileFlag ? styles.points : styles.pointsMobile}>
                <div className={styles.point}>
                    <img src={pointimg}/>
                    <p>Заботимся о вашем комфорте <br/>и безопасности</p>
                </div>

                <div className={styles.point}>
                    <img src={pointimg}/>
                    <p>Опытные специалисты помогут вам <br/>забронировать идеальное место</p>
                </div>

                <div className={styles.point}>
                    <img src={pointimg}/>
                    <p>Предоставляем эксклюзивные <br/>предложения по доступным ценам</p>
                </div>
            </div>

            <NavLink to="/catalogue" className={styles.bottomButtonWrapper}>
                <Button text="Начать поиски!" func={()=>{}} />
            </NavLink>
        </div>
    );
}