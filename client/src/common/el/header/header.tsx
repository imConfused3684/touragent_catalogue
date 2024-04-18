import styles from "./header.module.css";
import FavIco from "../../../assets/pfp.svg?react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png"

export default function Header() {
    return (
        <div className={styles.outerWrapper}>
            <div className={styles.innerWrapper}>
                <div className={styles.logoContainer}>
                    <NavLink to="/">
                        <img src={logo} alt="logo" />
                    </NavLink>
                </div>

                <div className={styles.navBar}>
                    <NavLink to="/">Главная</NavLink>
                    <NavLink to="/catalogue">Каталог</NavLink>
                </div>

                <div className={styles.navBar}>
                    <NavLink to="/about">О нас</NavLink>
                    <NavLink to="/favourite">
                            <FavIco className={styles.favico} />
                    </NavLink>
                </div>
            </div>
        </div>
    );
}