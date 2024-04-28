import styles from "./checkbox.module.css"

interface Props{
    text: string;
    func: (s: string) => void;
}

export default function CheckDiv({text, func}:Props) {
    return (<div className={styles.checkdiv}>{text}<input onChange={(e) => func(e.target.checked ? "1" : "0")} type="checkbox"/></div>);
}