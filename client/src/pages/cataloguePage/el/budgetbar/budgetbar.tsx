import styles from "./budgetbar.module.css"

interface Props{
    value: number;
    valueHook: (n: number) => void;
}

export default function BudgetBar({value, valueHook}:Props) {

    return (
        <div  className={styles.budget}>
            <p>Бюджет($) </p>
            <input
                className={styles.slider}
                type="range"
                name="budget"
                min="0"
                max="1000"
                value={value}
                step="1"
                
                onChange={(e)=>{valueHook(Number(e.target.value))}}
            />
            <p className={styles.value}>{value}</p>
        </div>
    );
}