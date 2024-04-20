import styles from "./footer.module.css";
import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
        <div className={styles.outerWrapper}>
            <div className={styles.innerWrapper}>
               <div className={styles.footerhalf}>
                    Контакты<br />
                    +7(232)964-23-12 contact@ya.ru<br />
                    Адрес<br />
                    Ул. Мира, Дом Кефира
               </div>
               <div className={styles.footerhalf}>
                    <NavLink to="/">Главная</NavLink><br />
                    <NavLink to="/catalogue">Каталог</NavLink><br />
                    <NavLink to="/favourite">Избранное</NavLink><br />
                    <NavLink to="/about">О нас</NavLink>
                </div>
            </div>
        </div>
    );
}