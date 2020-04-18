////POST TICKET
//Ticket is the equivalent of bucket
import {Ticket, TicketPostResponse} from "../../interfaces/Ticket"
import {TicketItem, TicketItemPostResponse} from "../../interfaces/Ticket"


axios.post<Ticket>(`Ticket`,{'session_id': session_id, 'table_number': table_number}).then(
	(res: TicketServerPostResponse) => {
		///..... add to previous order list, etc.
		ticket_id = res.data.ticket_id


		////POST TICKET ITEMS
		//Posts Each individual meal order in the ticket
		//Couldn't figure out how to post in bulk, does it individually
		//bucket_list = useState(...)

		for (const ticket_item in bucket_list){
			axios.post<TicketItem>(`TicketItem`,{'ticket_id': ticket_id,'menu_id': menu_id,
								 'ingredients_added': ingredients_added, 'ingredients_removed': ingredients_removed, 
								 'remark': remark, 'item_status': item_status}).then(
			(res: TicketPostResponse) => {
			})
		}
	})






