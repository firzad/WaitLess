import axios from "src/axios";
import { ServerResponse } from "src/interfaces/table";

export const getActiveTickets = () => {
    return axios.get(`/Ticket/active`).then(
        (res: ServerResponse) => {
            return res;
        }
    )
}
