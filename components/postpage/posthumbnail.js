import Link from "next/link";
import Date from "../date";
import styles from './postthumbnail.module.css';

export default function PostThumbnail ({id, date, title, tagList }) {
    return (
        
        <div className={styles.container}>
            <Link href={`/posts/${id}`}>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.tags}>
                {tagList}
            </div>
            <div className={styles.date}>
                <Date dateString={date} />
            </div>
            </Link>    
        </div>
        
    )
}