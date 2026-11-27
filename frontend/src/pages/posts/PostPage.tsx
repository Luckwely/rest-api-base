import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Container from "../../components/container";
import PostItem from "./components/post-item";
import type { Post } from "../../types/Post";
import Modal from "../../components/modal";
import PostUpdate from "../../components/posts/postUpdate";
import PostCreate from "../../components/posts/postCreate";
import { getAllPostApi } from "../../lib/services/posts/getAllPostApi";
import RemoveLoader from "../../components/ui/remove-loader";




export default function PostPage() {
    const [postList, setPostList] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    async function fetchAllPost() {
        const { posts } = await getAllPostApi();
        console.log(posts);

        setPostList(posts);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);

        fetchAllPost();
    }, []);

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const openModal = () => {
        setSelectedPost(null);
        setIsOpenModal((old: boolean) => !old)
    }

    const openEdit = (post: Post) => {
        setSelectedPost(post);
        setIsOpenModal((old: boolean) => !old)
    }

    return (
        <Container>
            <div className="flex justify-between items-center p-4">
                <h1 className="font-bold text-2xl">Liste des posts</h1>
                <button onClick={openModal}>New Post</button>
            </div>
            {isLoading ?
                <div className="text-center">Loading...</div>
                : (
                    <ul className="space-y-4 grid grid-cols-3 gap-2">
                        {postList.map((post: Post) => (
                            <PostItem key={post.id} post={post} setPostList={setPostList} />
                        ))}
                    </ul>
                )}


            {isOpenModal && (
                <Modal size="full" onClose={() => { setIsOpenModal(false); setSelectedPost(null); }}>
                    {selectedPost ? (
                        <PostUpdate post={selectedPost} setPostList={setPostList} setIsLoading={setIsLoading} setIsOpenModal={setIsOpenModal} />


                    ) : (

                        <PostCreate setPostList={setPostList} setIsLoading={setIsLoading} setIsOpenModal={setIsOpenModal} />
                    )}
                </Modal>
            )}
        </Container>
    )
}
