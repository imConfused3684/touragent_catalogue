import { useEffect, useState } from "react";
import styles from "./searchbar.module.css"
import { search } from "../../../../common/service/hotelService"

interface ButtonProps{
    valueHook: (s: string) => void;
}

async function getList(s: string): Promise<string[]>{

    let jsonlist = await search(s);

    return jsonlist.map(obj => obj.name);
}

export default function SearchBar({valueHook}:ButtonProps) {
    const [searchOptions, setSearchOptions] = useState<string[]>([]);
    useEffect(()=>{}, [searchOptions]);

    return (
        <>
            <input list="fastsearch" className={styles.search} type="text" placeholder="Поиск" 
                onChange={(e) => {valueHook(e.target.value); e.target.value != "" ? getList(e.target.value).then((data)=>{setSearchOptions(data)}).catch(()=>{setSearchOptions([])}) : setSearchOptions([])}}
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