import axios from "axios";

export async function deletePostApi(id: number) {
    const response = await axios.delete(
        `http://127.0.0.1:8000/api/posts/${id}`, {

        headers: {
            "Accept": "Application/json"
        }
    }
    );

    return response.data;
}