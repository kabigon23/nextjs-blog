import { useState } from "react";
import Link from "next/link";
import SearchData from "./searchdata";
import Date from "./date";
import PostsList from "./postslist";
import utilStyles from "../styles/utils.module.css";

export default function SearchPosts({data}) {
    const [search, setSearch] = useState("");
    const posts = data;
    const filteredPosts = posts.filter(({ id, title, tags, date }) => title.includes(search));

    return (
        <div>
            <SearchData
                type="text"
                placeholder="제목 검색..."
                value={search}
                onchange={e => setSearch(e.target.value)}
            />
            <PostsList posts={filteredPosts} />
            
        </div>
    );
}