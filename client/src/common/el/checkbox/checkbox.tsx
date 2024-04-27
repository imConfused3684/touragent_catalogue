import styles from "./checkbox.module.css"

interface ButtonProps{
    text: string;
    func: (s: string) => void;
}

export default function CheckDiv({text, func}:ButtonProps) {
    return (<div className={styles.checkdiv}>{text}<input onChange={(e) => func(e.target.checked ? "1" : "0")} type="checkbox"/></div>);
}