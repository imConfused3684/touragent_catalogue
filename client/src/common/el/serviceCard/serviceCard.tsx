import styles from "./serviceCard.module.css"

interface Props{
    name: string;
    description: string[];
}

export default function SeviceCard({name, description}:Props){
    return(
        <div className={styles.outerWrapper}>
            <hr/>
            <h2>{name}</h2>
            <div className={styles.descriptiondiv}>
                {
                    description.map((content, index)=>{return <p key={index}>{content}</p>})
                }
            </div>
        </div>
    )
}