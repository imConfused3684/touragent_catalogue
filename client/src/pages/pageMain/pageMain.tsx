import styles from "./pageMain.module.css";
import { NavLink } from "react-router-dom";
import mainOcean from "../../assets/mainOcean.jpg"
import mainTurtle from "../../assets/mainTurtle.png"
import pointimg from "../../assets/checkblue.png"

export default function Main() {
    return (
        <div className={styles.wrapper}>
            <h1>Traveling Around</h1>

            <div className={styles.adimg}>
                <img src={mainTurtle} alt="mainImage" />
            </div>

            <div className={styles.points}>
                <div className={styles.point}>
                    <img src={pointimg}/>
                    <p>Предоставляем эксклюзивные <br/>предложения по доступным ценам</p>
                </div>

                <div className={styles.point}>
                    <img src={pointimg}/>
                    <p>Заботимся о вашем комфорте <br/>и безопасности</p>
                </div>

                <div className={styles.point}>
                    <img src={pointimg}/>
                    <p>Опытные специалисты помогут вам <br/>забронировать идеальное место</p>
                </div>
            </div>

        </div>
    );
}