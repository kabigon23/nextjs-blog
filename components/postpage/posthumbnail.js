import Link from "next/link";
import Date from "../date";
import styles from './postthumbnail.module.css';

export default function PostThumbnail ({id, date, title, tagList }) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <Link href={`/posts/${id}`}>{title}</Link>
            </div>
            <div className={styles.tags}>
                {tagList}
            </div>
            <div className={styles.date}>
                <Date dateString={date} />
            </div>
            
        </div>
    )
}