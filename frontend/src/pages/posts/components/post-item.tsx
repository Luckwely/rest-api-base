import { useState, type Dispatch, type SetStateAction } from "react";
import type { Post } from "../../../types/Post";
import { deletePostApi } from "../../../lib/services/posts/deletePostApi";
import { getAllPostApi } from "../../../lib/services/posts/getAllPostApi";
import { formatDate } from "../../../utils/date";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import RemoveLoader from "../../../components/ui/remove-loader";
import { NavLink } from "react-router";


interface PostItemProps {
    post: Post;
    setPostList: Dispatch<SetStateAction<Post[]>>
}

export default function PostItem({ post, setPostList }: PostItemProps) {
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const handleDeletePost = async (id: number) => {
        try {
            const res = await deletePostApi(id);
            const { posts } = await getAllPostApi();
            setPostList(posts);
        } catch (error) {
            console.log(error);

        } finally {
            setIsDelete(false);
        }
    }
    return (
        <li key={post.id}>
            <div className="flex justify-end gap-2 items-center">
                <button disabled={isDelete} onClick={() => handleDeletePost(post.id)}>{isDelete ? <RemoveLoader /> : <FaTrash />}</button>
                <button><FaEdit /></button>
            </div>
            <time dateTime={post.createdAt}>
                Publie le {formatDate(post.createdAt)}
            </time>
            <NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>
        </li>
    )
}
