import styles from './bookthumbnail.module.css';
import Image from 'next/image';

export default function BookThumbnail({ title, author, publisher, image }) {
    return (
        <div className={styles.container}>
            <Image
                priority
                src={image}
                height={140}
                width={100}
                alt={`${title} 책사진입니다.`}
            />
            <div>
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.info}>
                    <div className={styles.author}>
                        저자: {author}
                    </div>
                    <div className={styles.publisher}>
                        출판사: {publisher}
                    </div>
                </div>


            </div>
        </div>
    )
}