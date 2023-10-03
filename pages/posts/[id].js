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
            const preElement = block.parentNode;
            // 이미 버튼이 추가되어 있으면 스킵
            if (preElement.parentNode.querySelector('.copyButton')) return;

            const button = createCopyButton(block);
            preElement.classList.add(utilStyles.codeContainer);
            preElement.insertBefore(button, block);

            handleScroll(preElement, button);
        });
    }, []);

    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingLg}>{postData.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />

                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div className={utilStyles.gap}>
                    태그: {tagList()}
                </div>
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

function createCopyButton(block) {
    const button = document.createElement('button');
    button.className = utilStyles.copyButton;
    button.innerText = 'Copy';
    button.addEventListener('click', () => handleCopyClick(button, block));
    return button;
}

function handleCopyClick(button, block) {
    navigator.clipboard.writeText(block.textContent).then(() => {
        button.style.background = '#505050';
        button.innerText = 'Copied';
        setTimeout(() => {
            button.style.background = 'gray';
            button.innerText = 'Copy';
        }, 2000);
    });
}

function handleScroll(preElement, button) {
    preElement.addEventListener('scroll', () => {
        button.style.right = (5 - preElement.scrollLeft) + 'px';
    });
}