import axios from "axios";

export async function getPostApi(id: string | undefined){
    const response = await axios.get(
        `http://127.0.0.1:8000/api/posts/${id}`
    );

    return response.data;
}