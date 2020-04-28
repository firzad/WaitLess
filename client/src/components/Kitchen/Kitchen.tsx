import * as React from "react";

import io from "socket.io-client";
import { Grid, Typography, Box } from "@material-ui/core";
import { userStyles } from "src/styles/userStyles";
import { OrderTicket } from "./OrderTicket";
import { OrderTicketFilter } from "./OrderTicketFilter";
import { TabPanelProps } from "src/interfaces/kitchen";
import { useEffect } from "react";
import { getCategories } from "src/services/category.service";
import { getActiveTickets } from "src/services/ticket.service";
import {net_path} from '../../pathing';


const socket = io.connect(net_path);

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}
export function Kitchen() {

    useEffect(() => {
        // Socket registered to listen to new tickets added to the system
        socket.on('ticketsUpdated', () => {
            updateTickets();
        })
        // eslint-disable-next-line
    }, []);

    const styleClasses = userStyles();

    const orderTickets: Array<any> = []
    const [categoryList, setCategoryList] = React.useState([
        { category_id: 100, category_name: 'All', position_in_menu: 0, visibility: true },
    ])
    const [filterValue, setFilterValue] = React.useState(categoryList[0]);
    const [orderTicketsData, setOrderTicketsData] = React.useState(orderTickets);
    const [filteredData, setFilteredData] = React.useState(orderTickets);



    // update the active tickets data
    const setTickets = (ticketResp: any) => {
        const orderTicketList = ticketResp.data.sort((a, b) => (a.ticket_timestamp > b.ticket_timestamp) ? 1 : ((b.ticket_timestamp > a.ticket_timestamp) ? -1 : 0));
        const orderTickets: Array<any> = [];
        // eslint-disable-next-line
        orderTicketList.map((order) => {
            const ticketDetails = {
                ticket_id: order[0].ticket_id,
                session_id: order[0].session_id,
                ticket_timestamp: order[0].ticket_timestamp,
                table_number: order[0].table_number,
                orderItems: {}
            };
            // eslint-disable-next-line
            order.map((orderItem) => {
                const itemDetails = {
                    order_item_id: orderItem.order_item_id,
                    menu_id: orderItem.menu_id,
                    ingredients_added: orderItem.ingredients_added,
                    ingredients_removed: orderItem.ingredients_removed,
                    remark: orderItem.remark,
                    item_status: orderItem.item_status,
                    quantity: orderItem.quantity,
                    category_id: orderItem.category_id,
                    item_name: orderItem.item_name,
                    description: orderItem.description,
                    price: orderItem.price,
                    visibility: orderItem.visibility,
                    position_in_menu: orderItem.position_in_menu,
                    date_added: orderItem.date_added,
                    total_calories: orderItem.total_calories,
                    discount: orderItem.discount,
                    category: orderItem.category,
                };
                if (ticketDetails.orderItems[itemDetails.category]) {
                    ticketDetails.orderItems[itemDetails.category].push(itemDetails);
                } else {
                    ticketDetails.orderItems[itemDetails.category] = [itemDetails]
                }
            });
            orderTickets.push(ticketDetails);
        });
        setOrderTicketsData(orderTickets);
        setFilteredData(orderTicketsData);
    }

    // On component-mount, get required category and ticket data
    useEffect(() => {
        Promise.all([getCategories(), getActiveTickets()]).then(([resp1, resp2]) => {
            setTickets(resp2);

            const catList = resp1.data;
            setCategoryList(categoryList.concat(catList));
            setFilterValue(categoryList[0]);
        })
        // eslint-disable-next-line
    }, []);

    const filterData = () => {
        const filteredDummy: Array<any> = [];
        if (filterValue.category_id === 100) {
            setFilteredData(orderTicketsData);
            return;
        }

        for (const order of orderTicketsData) {
            const orderDetail = Object.assign({}, order);

            orderDetail.orderItems = undefined;
            if (filterValue.category_name in order.orderItems) {
                orderDetail.orderItems = {};
                orderDetail.orderItems[filterValue.category_name] = order.orderItems[filterValue.category_name];
            }
            if (orderDetail.orderItems !== undefined) {
                filteredDummy.push(orderDetail);
            }
        }
        setFilteredData(filteredDummy);
    }

    useEffect(() => {
        filterData();
        // eslint-disable-next-line
    }, [filterValue]);

    // set filtered data when active tickets change
    useEffect(() => {
        setFilteredData(orderTicketsData);
    }, [orderTicketsData]);


    const updateFilter = (categoryId: number) => {
        let selectedFilter = categoryList.find(o => o.category_id === categoryId);
        if (!selectedFilter) {
            selectedFilter = categoryList[0];
        }
        setFilterValue(selectedFilter);
    }

    const updateTickets = () => {
        getActiveTickets().then((resp) => {
            setTickets(resp);
            setFilterValue(categoryList[0]);
        });
    }

    return (
        <div className={styleClasses.orderTicketFilter}>
            <OrderTicketFilter filterValue={filterValue} categoryList={categoryList} callbackFn={updateFilter} />
            {categoryList.map(item => (
                <TabPanel value={filterValue.category_id} index={item.category_id} key={item.category_id}>
                    {filteredData.length > 0 && <Grid container className={`${styleClasses.root} ${styleClasses.gridContainer}`} spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={3}>
                                {filteredData.map(item => (
                                    <OrderTicket key={item.ticket_id} value={item.ticket_id} order={item} updateTickets={updateTickets}></OrderTicket>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>}
                    {filteredData.length === 0 &&
                        <Typography variant="h2" component="h2" className={styleClasses.noTicket} gutterBottom align="center">
                            No Active Orders
                  </Typography>}
                </TabPanel>
            ))}
        </div>
    );
}
