import styles from "./searchbar.module.css"

interface ButtonProps{
    valueHook: (s: string) => void;
}

export default function SearchBar({valueHook}:ButtonProps) {
    return (
        <>
            <input list="fastsearch" className={styles.search} type="text" placeholder="Поиск" 
                onChange={(e) => {valueHook(e.target.value)}}
                onInput={()=>{}}
                onBlur={()=>{}}
            />
            <datalist id="fastsearch"> </datalist>
        </>
    );
}