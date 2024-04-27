import styles from "./button.module.css"

interface ButtonProps{
    text: string;
    func: () => void;
}

export default function Button({text, func}:ButtonProps) {
    return (<button className={styles.button} onClick={func} >{text}</button>);
}