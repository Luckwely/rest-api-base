import { useEffect, useState } from "react"
import type { Post } from "../types/Post";
import { getAllPostApi } from "../lib/services/posts/getAllPostApi";
import Container from "../components/container";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Modal from "../components/modal";
import PostCreate from "../components/posts/postCreate";
import PostUpdate from "../components/posts/postUpdate";

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
}

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

    const handleDeletePost = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8000/api/posts/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "Application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Error lors de la suppression");
            }

            setPostList((old) => old.filter((f) => f.id !== id))
        } catch (error) {
            console.log(error);
        }
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
                            <li key={post.id}>
                                <div className="flex justify-end gap-2 items-center">
                                    <button onClick={() => handleDeletePost(post.id)}><FaTrash /></button>
                                    <button onClick={() => openEdit(post)}><FaEdit /></button>
                                </div>
                                <time dateTime={post.createdAt}>
                                    Publie le {formatDate(post.createdAt)}
                                </time>
                                <h2>{post.title}</h2>
                            </li>
                        ))}
                    </ul>
                )}


            {isOpenModal && (
                <Modal size="full" onClose={() => {setIsOpenModal(false); setSelectedPost(null);}}>
                    {selectedPost ? (
                        <PostUpdate post={selectedPost}  setPostList={setPostList} setIsLoading={setIsLoading} setIsOpenModal={setIsOpenModal} />
                        

                    ) : (

                    <PostCreate setPostList={setPostList} setIsLoading={setIsLoading} setIsOpenModal={setIsOpenModal} />
                    )}
                </Modal>
            )}
        </Container>
    )
}
