import Button from "../../common/el/button/button";
import CheckDiv from "../../common/el/checkbox/checkbox";
import Selector from "../../common/el/selector/selector";
import { lists } from "../../common/interface/userinterface";
import { getLists } from "../../common/service/userService";
import styles from "./controlPage.module.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function ControlPanel({lists}:{lists:lists}){
    const navigator = useNavigate();
    const [user, setuser] = useState<number>(0);
    const [object, setobject] = useState<number>(0);
    const [check, setCheck] = useState<boolean>(lists.aUsers[user].admin == 1);

    useEffect(()=>{
        setCheck(lists.aUsers[user].admin == 1);
    },[user]);

    return (
        <>
            <hr/>
                <div className={styles.panelWrapper}>
                    <Selector colorFlag={true} options={lists.aUsers.map((elem, i) =>{ return {value: i.toString(), name: elem.login}})} stateHookFunc={setuser}/>
                    <CheckDiv value={check} text="Администратор" func={(flag: number)=>{setCheck(flag == 1); console.log("user " + lists.aUsers[user].login + " admin: " + flag)}}/>
                    <Button text="Удалить" func={()=>{}} />
                </div>
            <hr/>
                <Button text="Добавить" func={()=>{navigator("/add")}} />
                <div className={styles.panelWrapper}>
                    <Selector colorFlag={true} options={lists.aObjects.map((elem, i) =>{ return {value: i.toString(), name: elem.name}})} stateHookFunc={setobject}/>
                    <p>{
                        lists.aObjects[object].price + '$ '
                    }</p>
                    <p>{
                        lists.aObjects[object].rating
                    }</p>
                    <Button text="Изменить" func={()=>{navigator(`/add/${lists.aObjects[object].id}`)}} />
                    <Button text="Удалить" func={()=>{}} />
                </div>
            <hr/>

        </>
    )
}

export default function ControlPage(){
    const [content, setContent] = useState<React.ReactElement>(<div style={{color: "var(--main-color)", fontSize: "30px", textAlign: "center", paddingTop: "10vh"}}>Данные загружаются</div>);

    useEffect(()=>{
        const token = localStorage.getItem('travelToken');
        token ? getLists(token).then((data)=>{setContent(<ControlPanel lists={data}/>)}) : {}
    }, []);

    return(
        <div className={styles.outerWrapper}>
            {content}
        </div>
    )
}