import { useEffect, useState } from "react";
import styles from "./searchbar.module.css"

interface ButtonProps{
    valueHook: (s: string) => void;
}

export default function SearchBar({valueHook}:ButtonProps) {
    const [searchOptions, setSearchOptions] = useState<string[]>(["peins", "ccko"]);
    useEffect(()=>{}, [searchOptions]);

    return (
        <>
            <input list="fastsearch" className={styles.search} type="text" placeholder="Поиск" 
                onChange={(e) => {valueHook(e.target.value)}}
                onInput={()=>{setSearchOptions([])}}
                onBlur={()=>{setSearchOptions([])}}
            />
            <datalist id="fastsearch">{
                searchOptions.map((option, index)=>{
                    return <option key={index}>{option}</option>;
                })
            }</datalist>
        </>
    );
}