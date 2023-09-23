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
        <div className={utilStyles.alignCenter} style={{ marginLeft: '-40px' }}>
        <TagCloud3D 
        texts={tags}
        />
        </div>
        
        
        <p>
          이 블로그는 React 기반 Next.js 프레임워크로 제작되었습니다.
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