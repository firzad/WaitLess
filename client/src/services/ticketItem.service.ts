import axios from "src/axios";
import { ServerResponse } from "src/interfaces/table";

export const updateItemToComplete = (itemIds: Array<number>) => {
    return axios.patch('TicketItem/Update', { item_status:'Complete', 'order_item_ids': itemIds }).then(
        (res: ServerResponse) => {
            return res;
        }
    )
}
