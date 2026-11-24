import axios from "axios";

export async function getAllPostApi(){
    const response = await axios.get(
        `http://127.0.0.1:8000/api/posts`
    );

    return response.data;
}