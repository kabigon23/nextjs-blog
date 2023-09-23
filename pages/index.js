import Head from 'next/head';
import Image from 'next/image';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import TagCloud3D from '../components/tagcloud3d';
import {getUniqueTags} from '../components/tagposts';
import { getSortedPostsData } from '../lib/posts';

export default function Home({ allPostsData }) {
  const tags= getUniqueTags(allPostsData);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>안녕하세요 국밥의 개발창고에 오신 것을 환영합니다.</p>
        {/* <div className={utilStyles.alignCenter}>
          <Image
            priority
            src="/images/gukbab.jpeg"
            height={360}
            width={360}
            alt="페이지용 프로필사진입니다."
          />
        </div> */}
        <div className={utilStyles.alignCenter} style={{ marginLeft: '-40px' }}>
        <TagCloud3D 
        texts={tags}
        />
        </div>
        
        
        <p>
          이 블로그는 Next.js로 만들어졌습니다.
        </p>
      </section>
      
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
      props: {
          allPostsData,
      },
  };
}