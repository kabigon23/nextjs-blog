import { useState } from "react";
import PostsList from "./postslist";
import tagPostsStyles from "./tagposts.module.css";
import utilStyles from "../styles/utils.module.css";

export default function TagPosts({ data, paramsTag }) {
    // C# 예외처리 코드 추가
    if (paramsTag == "csharp") {
        paramsTag = "C#";
    }
    // ---------
    const posts = data;
    const [tagval, setTagval] = useState(paramsTag ? [paramsTag]: []);

    const handleTagClick = (tag) => {
        if (tagval.includes(tag)) {
            setTagval(prevTags => prevTags.filter(t => t !== tag));
        } else {
            setTagval(prevTags => [...prevTags, tag]);
        }
    };
    
    const tagedPosts = posts.filter(post =>
        tagval.every(tag => post.tags.includes(tag))
    );
    
    const uniqueTags = getUniqueTags(posts);
    return (
        <div>
            <div className={tagPostsStyles.tagButtons}>
                {uniqueTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        style={{ backgroundColor: tagval.includes(tag) ? 'gray' : 'white' }}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <PostsList posts={tagedPosts} />
        </div>
    );
}

export const getUniqueTags = (posts) => {
    let tagsSet = new Set();

    posts.forEach(post => {
        post.tags.forEach(tag => {
            tagsSet.add(tag);
        });
    });

    return [...tagsSet];
}