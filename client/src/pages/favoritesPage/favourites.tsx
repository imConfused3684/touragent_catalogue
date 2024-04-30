import styles from "./favourites.module.css"
import Button from "../../common/el/button/button"

export default function FavouritesPage(){
    function signout(){
        
    }

    return(
        <>
            <h1 className={styles.favh1}>Понравившееся предложения</h1>
            <Button text="Выйти" func={signout} />
        </>
    )
}