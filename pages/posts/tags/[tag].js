import Layout from "../../../components/layout";
import { useState } from "react";
import { getSortedPostsData } from "../../../lib/posts";
import utilStyles from "../../../styles/utils.module.css";
import styles from "../../../components/layout.module.css";
import TagPosts from "../../../components/tagposts";
import { getUniqueTags } from "../../../components/tagposts";
import SearchPosts from "../../../components/searchposts";
import Head from "next/head";

export default function Tag({ allPostsData, paramsTag }) {
    const [view, setView] = useState("Tags");
    const handleView = () => {
        if (view === "All") {
            return <SearchPosts data={allPostsData} />;
        } else if (view === "Tags") {
            return <TagPosts data={allPostsData} paramsTag={paramsTag} />;
        }
    }

    return (
        <Layout>
            <Head>
                <title>국밥의 포스트</title>
            </Head>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <div className={styles.view}>
                    <button onClick={() => setView("All")}>All</button>
                    <button onClick={() => setView("Tags")}>Tags</button>
                </div>
                <div>
                    {handleView()}
                </div>

            </section>
        </Layout>

    );
}
export async function getStaticPaths() {
    const allPostsData = getSortedPostsData();
    const tags = getUniqueTags(allPostsData);
    const paths = tags.map(tag => ({
        params: { tag: tag.toString() }
    }));
    
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({params}) {
    const paramsTag = params.tag;
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
            paramsTag,
        },
    };
}