import styles from "./selector.module.css"

type option = {
    value: string;
    name: string;
}

interface Props{
    colorFlag: boolean;
    options: option[];
    stateHookFunc: (s: string) => void;
}

export default function Selector({colorFlag, options, stateHookFunc}:Props) {
    return (
        <select defaultValue={options[0].value} onChange={(e) => stateHookFunc(e.target.value)} className={colorFlag ? styles.selectorMain : styles.selectorBlack}>
            {
                options.map((option, index)=>{
                    return index == 0 ? <option key={index} value={option.value} disabled hidden>{option.name}</option> : <option key={index} value={option.value} >{option.name}</option>;
                })
            }
        </select>
    );
}