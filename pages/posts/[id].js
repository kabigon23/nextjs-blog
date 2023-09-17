import { useEffect } from 'react';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import Link from 'next/link';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
    const tagList = () => postData.tags.map(tag => (
        <div key={tag}>{tag}</div>
    ));

    useEffect(() => {
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach((block) => {
            // 이미 버튼이 추가되어 있으면 스킵
            if (block.parentNode.querySelector('.copyButton')) return;

            const button = document.createElement('button');
            button.className = utilStyles.copyButton;
            button.innerText = 'Copy';
            button.addEventListener('click', () => {
                navigator.clipboard.writeText(block.textContent).then(() => {
                    button.style.background = '#505050';
                    button.innerText = 'Copied';
                    setTimeout(() => {
                        button.style.background = 'gray';
                        button.innerText = 'Copy';
                    }, 2000);
                });
            });
            block.parentNode.classList.add(utilStyles.codeContainer);
            block.parentNode.insertBefore(button, block);
        });
    }, [postData]);

    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div className={utilStyles.gap}>
                    Tags: {tagList()}
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
            <Link href="/posts">전체글 보기</Link>
        </Layout>
    );
}

// ... 나머지 코드 ...



export async function getStaticPaths() {
    const paths = getAllPostIds();
    
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}