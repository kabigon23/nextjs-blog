import Layout from "../../components/layout";
import { useState } from "react";
import { getSortedPostsData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";
import styles from "../../components/layout.module.css";
import TagPosts from "../../components/tagposts";
import SearchPosts from "../../components/searchposts";
import Head from "next/head";

export default function Posts({ allPostsData }) {
    const [view, setView] = useState("All");
    const handleView = () => {
        if (view === "All") {
            return <SearchPosts data={allPostsData} />;
        } else if (view === "Tags") {
            return <TagPosts data={allPostsData} />;
        }
    }

    return (
        <Layout>
            <Head>
                <title>posts</title>
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

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}