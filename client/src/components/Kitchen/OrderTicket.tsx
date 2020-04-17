import moment from "moment";
import React, { useState, useEffect } from "react";
import { orderTicketStyles } from "src/styles/orderTicket";
import {
    Grid, Card, CardContent, Typography, CardActions, Button, CardHeader, Avatar, IconButton, Checkbox,
    FormControlLabel, FormGroup, FormControl // FormLabel,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import { updateItemToComplete } from "src/services/ticketItem.service";

export function OrderTicket(props: any) {
    const styleClasses = orderTicketStyles();
    const selectItemList: Array<number> = [];
    // const bull = <span className={styleClasses.bullet}>•</span>;

    const [dateTime, setDateTime] = useState(moment.duration(moment().utc().diff(moment(props.order.ticket_timestamp).utc())));
    const [priorityTheme, setPriorityTheme] = useState({ timeColor: 'default', cardBorderColor: 'default' });
    const [selectedItems, setSelectedItems] = useState(selectItemList);
    const [serveButtonDisabled, setServeButtonDisabled] = useState(true);

    useEffect(() => {
        const id = setInterval(() => {
            setDateTime(moment.duration(moment().utc().diff(moment(props.order.ticket_timestamp).utc())));
            if (dateTime.asMinutes() < 10) {
                setPriorityTheme({ timeColor: styleClasses.timerGreen, cardBorderColor: styleClasses.cardBorderGreen });
            } else if (dateTime.asMinutes() < 15) {
                setPriorityTheme({ timeColor: styleClasses.timerYellow, cardBorderColor: styleClasses.cardBorderYellow });
            } else {
                setPriorityTheme({ timeColor: styleClasses.timerRed, cardBorderColor: styleClasses.cardBorderRed });
            }
        }, 1000);
        return () => {
            clearInterval(id);
        }
        // eslint-disable-next-line
    }, [dateTime]);

    const updateItems = (e: any) => {
        const options = selectedItems;
        let index;
        // check if the check box is checked or unchecked
        if (e.target.checked) {
            // add the numerical value of the checkbox to options array
            options.push(+e.target.value);
            setServeButtonDisabled(false);
        } else {
            // or remove the value from the unchecked checkbox from the array
            index = options.indexOf(+e.target.value);
            options.splice(index, 1);

            if(options.length == 0){
                setServeButtonDisabled(true);
            }
        }
        // update the state with the new array of options
        setSelectedItems(options);
    }

    const serveItems = () => {
        updateItemToComplete(selectedItems).then((resp) => {
            setSelectedItems(selectItemList);
            props.updateTickets();
        });
    }

    return (

        <Grid key={props.value} item>
            <Card className={`${styleClasses.root} ${priorityTheme.cardBorderColor}`} variant="outlined">
                <CardHeader
                    avatar={
                        <Avatar aria-label="timer"
                            className={priorityTheme.timeColor}>
                            <AccessTimeIcon />
                        </Avatar>
                    }
                    title={`Table #${props.order.table_number}      Order #${props.order.ticket_id}`}
                    subheader={moment.utc(dateTime.asMilliseconds()).format("HH:mm:ss")}
                />
                <CardContent>
                    {/* <Typography variant="h5" component="h2">
                        be{bull}nev{bull}o{bull}lent
                    </Typography> */}
                    {Object.keys(props.order.orderItems).map((key, idx) => (
                        <div id={`${idx}`} key={idx}>
                            <Typography className={styleClasses.pos} color="textSecondary">
                                {key}
                            </Typography>
                            {props.order.orderItems[key].map((item, index) => (
                                <div id={index} key={index}>
                                    <FormControl component="fieldset" className={styleClasses.formControl}>
                                        <FormGroup>
                                            <FormControlLabel className={styleClasses.formControlLabel}
                                                control={<Checkbox value={item.order_item_id} inputProps={{ 'aria-label': 'Test Item #1' }} onChange={updateItems} disabled={item.item_status === "Complete"}/>}
                                                label={item.item_name} />
                                            {item.ingredients_added &&
                                                <Typography variant="body2" component="p" className={styleClasses.addIngredient}>
                                                    {`+ ${item.ingredients_added}`}
                                                </Typography>
                                            }
                                            {item.remark &&
                                                <Typography variant="body2" component="p">
                                                    {`${item.remark}`}
                                                </Typography>
                                            }
                                        </FormGroup>
                                        {/* <FormHelperText>Helper Text</FormHelperText> */}
                                    </FormControl>
                                </div>
                            ))}
                        </div>
                    ))}
                </CardContent>
                <CardActions>
                    <Button className={`flex-grow-1`} variant="outlined" size="small" disabled={serveButtonDisabled} onClick={serveItems}>Serve</Button>
                    <IconButton aria-label="settings" className={`flex-grow-1`} >
                        <AccessibilityIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
}

