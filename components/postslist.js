import PostThumbnail from "./postpage/posthumbnail";
import utilStyles from "../styles/utils.module.css";
import styles from "./postslist.module.css";

export default function PostList({ posts }) {
    return (
        <div>
            <ul className={utilStyles.list}>
                {posts.map(({ id, date, title, tags }) => {
                    const tagList = () => tags.map(tag => (
                        <div key={tag}>{tag}</div>
                    ));
                    return (
                        <li className={`${utilStyles.listItem} ${styles.fadeInEffect}`} key={id}>
                            <PostThumbnail 
                            id={id}
                            date={date}
                            title={title}
                            tagList={tagList()}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}