import styles from "./checkbox.module.css"

interface Props{
    value?: boolean;
    text: string;
    func: (n: number) => void;
}

export default function CheckDiv({value, text, func}:Props) {
    return (<div className={styles.checkdiv}>{text}<input checked={value} onChange={(e) => func(e.target.checked ? 1 : 0)} type="checkbox"/></div>);
}