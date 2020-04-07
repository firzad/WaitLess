import * as React from "react";

import { Grid } from "@material-ui/core";
import { userStyles } from "src/styles/userStyles";
import { OrderTicket } from "./OrderTicket";

export function Kitchen() {
    const styleClasses = userStyles();
    const dummyData: any = [
        {
            tabeleNo: '1234',
            orderNo: 100,
            orderDate: new Date('2020-04-01T03:15:50.737Z'),
            orderItems: []
        },
        {
            tabeleNo: '2345',
            orderNo: 101,
            orderDate: new Date('2020-04-01T03:10:50.737Z'),
            orderItems: []
        },
        {
            tabeleNo: '3456',
            orderNo: 102,
            orderDate: new Date('2020-04-01T03:05:50.737Z'),
            orderItems: []
        },
        {
            tabeleNo: '4567',
            orderNo: 103,
            orderDate: new Date('2020-04-01T03:20:50.737Z'),
            orderItems: []
        },
    ]

    return (
        <Grid container className={`${styleClasses.root} ${styleClasses.gridContainer}`} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={3}>
                    {dummyData.sort((a,b) => (a.orderDate > b.orderDate) ? 1 : ((b.orderDate > a.orderDate) ? -1 : 0)).map(item => (
                        <OrderTicket key={item.orderNo} value={item.orderNo} orderItem={item}></OrderTicket>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}
