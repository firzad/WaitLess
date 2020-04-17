import axios from "src/axios";
import { ServerResponse } from "src/interfaces/table";

export const getCategories = () => {
    return axios.get(`Categories`).then(
        (res: ServerResponse) => {
            return res;
        }
    )
}
