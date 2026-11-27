import { useEffect, useState } from 'react'
import type { Post } from '../../types/Post';
import { useParams } from 'react-router';
import { getPostApi } from '../../lib/services/posts/getPostApi';
import Container from '../../components/container';
import { formatDate } from '../../utils/date';

export default function PostShow() {
    const [postData, setPostData] = useState<Post | null>(null);
    const {id} = useParams();

    useEffect(() => {
        async function fetchPost() {
            const {post} = await getPostApi(id);
            setPostData(post);
            console.log(post);
        }
        fetchPost();
    }, [])
  return (
    <Container>
        <span>{formatDate(postData?.createdAt)}</span>
        <h2>{postData?.title}</h2>
        <p>{postData?.description}</p>
    </Container>
  )
}
