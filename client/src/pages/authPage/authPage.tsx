import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styles from "./authPage.module.css"
import Button from "../../common/el/button/button";

import { loginCheck, registration } from "../../common/service/userService";

export default function AuthPage(){
    const navigator = useNavigate();

    const [disabled, setDisabled] = useState<boolean>(false);
    const [logregFlag, setLogregFlag] = useState<boolean>(true);
    const [login, setlogin] = useState<string>("");
    const [password, setpassword] = useState<string>("");

    function loginF() {
        setDisabled(true);
        loginCheck(login, password).then((response)=>{
            if(response.token){
                localStorage.setItem('travelToken', response.token);
                navigator("/favourite");
            }else{
                setDisabled(false);
            }
        })
    }
    function registerF() {
        setDisabled(true);
        registration(login, password).then((response)=>{
            if(response.token){
                localStorage.setItem('travelToken', response.token);
                navigator("/favourite");
            }else{
                setDisabled(false);
            }
        })
    }

    return(
        <div className={styles.outerWrapper}>
            <div className={styles.innerWrapper}>
                <div className={styles.loginBox}>
                    <input disabled={disabled} className={styles.inp} onChange={(e)=>{setlogin(e.target.value)}} type="text" placeholder="Логин"/>
                    <input disabled={disabled} className={styles.inp} onChange={(e)=>{setpassword(e.target.value)}} type="password" placeholder="Пароль"/>
                    <div className={styles.other}>
                        <Button 
                            text={logregFlag ? "Войти" : "Зарегистрироваться"} 
                            func={logregFlag ? loginF : registerF}
                        />
                        <p className={styles.text} onClick={()=>setLogregFlag(!logregFlag)}>{logregFlag ? "или зарегистрироваться" : "или войти"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}