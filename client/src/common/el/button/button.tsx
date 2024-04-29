import styles from "./button.module.css"

interface Props{
    text: string;
    func: () => void;
}

export default function Button({text, func}:Props) {
    return (<button className={styles.button} onClick={func} >{text}</button>);
}