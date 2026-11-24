import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.BACKEND_API,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    // withCredentials: true,
});

//intercepteur des erreurs
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {

            console.error("API Error", error.response.data);
    
            if (error.response.status === 401) {
                console.error("NOn authentifie");
            }
    
            if (error.response.status === 403) {
                console.error("Access interdit");
            }
    
            if (error.response.status === 422) {
                console.error("Erreurs de validation");
            }
        }else if (error.request) {
            console.error("Serveur inaccessible");
        }else {
            console.error("error.message");
        }

        return Promise.reject(error);
    }

);