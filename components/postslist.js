import Link from "next/link";
import Date from "./date";
import PostsListStyles from "./postslist.module.css";
import utilStyles from "../styles/utils.module.css";


export default function PostList({ posts }) {
    return (
        <div>
            <ul className={utilStyles.list}>
                {posts.map(({ id, date, title, tags }) => {
                    const tagList = () => tags.map(tag => (
                        <div key={tag}>{tag}</div>
                    ));
                    return (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>{title}</Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                            <br />
                            <small className={PostsListStyles.tagList}>
                                Tags: {tagList()}
                            </small>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}