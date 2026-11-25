import { useState, type Dispatch, type SetStateAction } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { postSchema, type postSchemType } from "../../schema/post.schema"
import { getAllPostApi } from "../../lib/services/posts/getAllPostApi"
import type { Post } from "../../types/Post"

type Props = {
    post: Post,
    setPostList: Dispatch<SetStateAction<Post[]>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setIsOpenModal: Dispatch<SetStateAction<boolean>>
}

export default function PostUpdate({post, setPostList, setIsLoading, setIsOpenModal }: Props) {
    const [serverError, setServerError] = useState<string | null>(null)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<postSchemType>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: post.title,
            description: post.description
        },
    })

    const submit: SubmitHandler<postSchemType> = async (data) => {
        setServerError(null)
        try {
            const response = await fetch(`http://localhost:8000/api/posts/${post.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("failed to post");
            }

            const savedPost = await response.json()
            reset()

            setIsLoading(true);
            const { posts } = await getAllPostApi();
            setPostList(posts);
            setIsLoading(false);
            setIsOpenModal(false);
            
        } catch (error) {
            setServerError("Could not update post, try again")
            console.log(error);
        }
    }
    return (
        <div>
            <h2 className="text-3xl font-bold">Update Post</h2>
            {serverError && <p className="text-red-500">{serverError}</p>}

            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <label>Title</label>
                    <input {...register("title")} type="text" className="input" placeholder="Post title" />
                    {errors.title && <p role="alert" className="text-red-500">{errors.title.message}</p>}
                </div>
                <div>
                    <label>Description</label>
                    <textarea {...register("description")} className="input" placeholder="Post description"></textarea>
                    {errors.description && <p role="alert" className="text-red-500">{errors.description.message}</p>}
                </div>
                <div>
                    <button className="bg-green-600 text-white px-3 py-1 rounded-md" disabled={isSubmitting}>{isSubmitting ? 'Updating...' : 'update'}</button>
                </div>
            </form>
        </div>
    )
}
