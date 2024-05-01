import styles from "./addPage.module.css"
import { useEffect, useRef, useState } from "react"

import Button from "../../common/el/button/button"
import template from "../../assets/tempalte.png"
import Selector from "../../common/el/selector/selector";
import WaterCheck from "../../common/el/checkbox/checkbox";
import SeviceCard from "../../common/el/serviceCard/serviceCard";
import { Hotel } from "../../common/interface/hotelInterface";
import { add } from "../../common/service/hotelService";

export default function AddPage(){
    const picloaderRef = useRef<HTMLInputElement>(null);
    const servName = useRef<HTMLInputElement>(null);
    const servDesc = useRef<HTMLTextAreaElement>(null);

    const [servIndex, setservIndex] = useState<number>(1);
    const [addedServs, setaddedServs] = useState<Hotel["aServices"]>([]);
    const [finalServs, setfinalServs] = useState<Hotel["aServices"]>([]);
    const [servnameError, setservnameError] = useState<boolean>(false);
    const [servdescError, setservdescError] = useState<boolean>(false);


    const [nameError, setNameError] = useState<boolean>(false);
    const [priceError, setPriceError] = useState<boolean>(false);
    const [descriptionError, setdescriptionError] = useState<boolean>(false);
    const [addressError, setaddressError] = useState<boolean>(false);
    const [contactError, setcontactError] = useState<boolean>(false);
    const [hoteltypeError, sethoteltypeError] = useState<boolean>(false);
    const [hotelfoodError, sethotelfoodError] = useState<boolean>(false);
    

    const [name, setname] = useState<string>("");
    const [price, setprice] = useState<string>("");
    const [image, setImage] = useState<string>(template);
    const [description, setdescription] = useState<string>("");
    const [typeSelector, setTypeSelector] = useState<number>(-1);
    const [foodTypeSelector, setFoodTypeSelector] = useState<number>(-1);
    const [watercheck, setWatercheck] = useState<number>(0);
    const [address, setaddress] = useState<string>("");
    const [contact, setcontact] = useState<string>("");


    useEffect(()=>{if(hoteltypeError) sethoteltypeError(false)},[typeSelector]);
    useEffect(()=>{if(hotelfoodError) sethotelfoodError(false)},[foodTypeSelector])

    function checkvalid():boolean{
        let flag = true;

        if(name.trim() == "" || name.length > 50){
            setNameError(true);
            flag = false;            
        }
        if(!Number.isInteger(Number(price)) || Number(price) < 0 || Number(price) > 1000){
            setPriceError(true);
            flag = false;            
        }
        if(image == template){
            alert("Добавьте изображение");
            flag = false;            
        }
        if(description == ""){
            setdescriptionError(true);
            flag = false;            
        }
        if(address == ""){
            setaddressError(true);
            flag = false;            
        }
        if(contact == ""){
            setcontactError(true);
            flag = false;            
        }
        if(typeSelector == -1){
            sethoteltypeError(true);
            flag = false;            
        }
        if(foodTypeSelector == -1){
            sethotelfoodError(true);
            flag = false;            
        }

        if(!flag){
            alert("Корректно заполните выделенные поля")
        }

        return flag;
    }
    function ready(){
        if(checkvalid()){
            setfinalServs([
                ...addedServs.slice(0, 0),
                { ser_id: 0, name: "ОБЩАЯ ИНФОРМАЦИЯ", description: `Расположение: ${address}\nКонтактная информация: ${contact}` },
                ...addedServs.slice(0)
            ]);
        }
    }
    function addpicture(){
        picloaderRef.current?.click();
    }
    function handlePictureInput(){

        if (picloaderRef.current?.files) {
            let reader = new FileReader();
            reader.onload = function(e) {
                setImage(String(e.target?.result));
            };
            reader.readAsDataURL(picloaderRef.current?.files[0]);
        }
    }
    function addserv(){
        let flag = true;

        if(servName.current?.value.trim() == ""){
            setservnameError(true);
            flag = false;
        }
        if(servDesc.current?.value.trim() == ""){
            setservdescError(true);
            flag = false;
        }

        if(flag){
            setaddedServs([...addedServs, {ser_id: servIndex, name: String(servName.current?.value), description: String(servDesc.current?.value)}]);
            servName.current?.value ? servName.current.value = "" : {};
            servDesc.current?.value ? servDesc.current.value = "" : {};
            setservIndex(servIndex+1);
        }
        else{
            alert("Заполните все выделенные поля");
        }
    }

    
    useEffect(()=>{
        const token = localStorage.getItem('travelToken');
        if(finalServs.length > 0 && token){
            add(token, name, Number(price), image, description, typeSelector, foodTypeSelector, watercheck, finalServs);
        }
    },[finalServs]);

    return(
        <div className={styles.outerWrapper}>
            <h1 className={styles.addh1}>Добавление позиции</h1>

            <div className={styles.buttonsWrapper}>
                <Button text="Готово" func={ready}/>
                <Button text="Очистить" func={()=>{document.location.reload()}}/>
            </div>

            <div className={styles.inputWrapper}>
                <p>Название (максимум 50 символов): </p>
                <input onBlur={()=>{if(nameError) setNameError(false)}} onChange={(e)=>{setname(e.target.value)}} type="text" style={nameError ? {border: "1px solid var(--error-color)", width: "300px"} : {border: "1px solid var(--main-color)", width: "300px"}} placeholder="Название"/>
                {nameError ? <div className={styles.error} >Непустая текстовая строка, не более 50 символов.</div> : null}
            </div>

            <div className={styles.inputWrapper}>
                <p>Цена($): </p>
                <input onBlur={()=>{if(priceError) setPriceError(false)}} onChange={(e)=>{setprice(e.target.value)}} type="text" style={priceError ? {border: "1px solid var(--error-color)", width: "300px"} : {border: "1px solid var(--main-color)", width: "300px"}} placeholder="Цена"/>
                {priceError ? <div className={styles.error} >Число от 0 до 1000.</div> : null}
            </div>

            <Button text="Добавить изображение" func={addpicture}/>
            <input ref={picloaderRef} type="file" id="fileInput" style={{display: "none"}} onChange={handlePictureInput}/>
            <img className={styles.viewimg} src={image} alt="preview"/>

            <textarea onBlur={()=>{if(descriptionError) setdescriptionError(false)}} onChange={(e)=>{setdescription(e.target.value)}} style={descriptionError ? {border: "1px solid var(--error-color)"} : {}} className={styles.description} rows={6} cols={40} placeholder="Введите описание"></textarea>

            <hr/>

            <div className={styles.mainDiv}>
                <h2>ОБЩАЯ ИНФОРМАЦИЯ</h2>
                <div className={styles.descriptiondiv}>
                    <p>Расположение:</p>
                    <input onBlur={()=>{if(addressError) setaddressError(false)}} onChange={(e)=>{setaddress(e.target.value)}} style={addressError ? {border: "1px solid var(--error-color)"} : {}} type="text" className="address" placeholder="Адрес"/>
                    <p>Контактная информация: </p>
                    <input onBlur={()=>{if(contactError) setcontactError(false)}} onChange={(e)=>{setcontact(e.target.value)}} style={contactError ? {border: "1px solid var(--error-color)"} : {}} type="text" className="phone" placeholder="Например: почта"/>
                </div>
            </div>
            <div className={styles.selectors}>
                <Selector 
                    colorFlag={!hoteltypeError} 
                    options={[
                            {value:"-1", name:"Тип отеля"},
                            {value:"1", name:"Отель"},
                            {value:"2", name:"Гостевой дом"},
                            {value:"3", name:"Апартаменты"},
                            {value:"4", name:"Вилла"}
                    ]}
                    stateHookFunc={setTypeSelector}
                />

                <Selector 
                    colorFlag={!hotelfoodError} 
                    options={[
                        {value:"-1", name:"Питание"},
                        {value:"1", name:"Нет"},
                        {value:"2", name:"Только завтрак"},
                        {value:"3", name:"Завтрак, ужин"},
                        {value:"4", name:"Полное"}
                    ]}
                    stateHookFunc={setFoodTypeSelector}
                />

                <WaterCheck text="У воды" func={setWatercheck}/>
            </div>
            
            <hr/>
            <div className={styles.infodiv}>
                <input ref={servName} onBlur={()=>{if(servnameError) setservnameError(false)}} style={servnameError ? {border: "1px solid var(--error-color)"} : {}} type="text" placeholder="Введите название услуги" />
                <div className={styles.servButtonWrapper}><Button text="Добавить услугу" func={addserv}/></div>
                <div className={styles.servDescriptionWrapper}>
                    <textarea ref={servDesc} onBlur={()=>{if(servdescError) setservdescError(false)}} style={servdescError ? {border: "1px solid var(--error-color)"} : {}} className={styles.description} rows={6} cols={40} placeholder="Введите описание"></textarea>
                </div>
            </div>
            {
                addedServs.map((serv)=>{ return <SeviceCard key={serv.ser_id} name={serv.name} description={serv.description.split('\n')}/>})
            }
            <hr/>
        </div>
    )
}