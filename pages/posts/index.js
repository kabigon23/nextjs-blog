import Layout from "../../components/layout";
import { useState } from "react";
import Link from "next/link";
import Date from '../../components/date';
import { getSortedPostsData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";

export default function Posts({ allPostsData }) {
    const posts = allPostsData;
    const [search, setSearch] = useState("");

    const filteredPosts = posts.filter(({id, title, date}) => title.includes(search));
    
    return (
        <Layout>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2>posts</h2>
                <input className={`${utilStyles.input} ${utilStyles.margin10pxd}`}
                    type="text"
                    placeholder="제목 검색..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <ul className={utilStyles.list}>
                    {filteredPosts.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>{title}</Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
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