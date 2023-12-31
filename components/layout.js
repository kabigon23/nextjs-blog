import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = "Gukbabman";
export const siteTitle = "국밥맨의 개발창고";

export default function Layout({ children, home }) {
    return (
    <div className={styles.outerContainer}>
    <div className={styles.container}>
        <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta
                name="description"
                content="국밥맨의 개발창고입니다." 
            />
            <meta
                property="og:image"
                content="/images/gukbab_cartoon.png"
            />
            <meta name="og:title" content={siteTitle} />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className={styles.header}>
            <>
                <Link href="/">
                    <div className={utilStyles.padding10pxl}>
                        <Image
                            priority
                            src="/images/gukbab_cartoon.png"
                            className={utilStyles.borderCircle}
                            height={60}
                            width={60}
                            alt="페이지용 프로필사진입니다." 
                        />
                    </div>
                </Link>

                <h2 className={`${utilStyles.headingLg} ${utilStyles.padding10pxl}`}>
                    <Link href="/" className={utilStyles.colorInherit}>
                        {siteTitle}
                    </Link>
                </h2>
            </>
        </header>
        
        <nav className={styles.nav}>
            <>
                <Link href="/posts" className={`${utilStyles.headingMd} ${utilStyles.blackText}`}>포스트</Link>
                <Link href="/books" className={`${utilStyles.headingMd} ${utilStyles.blackText}`}>서재</Link>
            </>
        </nav>
        <div className={styles.contents}>
            <main>{children}</main>
            {!home && (
                <div className={styles.backTohome}>
                    <Link href="/">
                        홈으로 돌아가기
                    </Link>
                </div>
            )}
        </div>
        <div className={styles.bottom}>
            © 2023. 국밥맨의 개발창고 all rights reserved.
        </div>    
        
    </div>
    </div>
    )
}