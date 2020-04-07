import moment from "moment";
import React, { useState, useEffect } from "react";
import { orderTicketStyles } from "src/styles/orderTicket";
import {
    Grid, Card, CardContent, Typography, CardActions, Button, CardHeader, Avatar, IconButton, Checkbox,
    FormControlLabel, FormGroup, FormControl, // FormLabel,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AccessibilityIcon from "@material-ui/icons/Accessibility";

export function OrderTicket(props: any) {
    const styleClasses = orderTicketStyles();
    // const bull = <span className={styleClasses.bullet}>•</span>;

    const [dateTime, setDateTime] = useState(moment.duration(moment().utc().diff(moment(props.orderItem.orderDate).utc())));
    const [priorityTheme, setPriorityTheme] = useState({ timeColor: 'default', cardBorderColor: 'default' });

    useEffect(() => {
        const id = setInterval(() => {
            setDateTime(moment.duration(moment().utc().diff(moment(props.orderItem.orderDate).utc())));
            // console.log(props.orderItem.orderNo, dateTime.minutes())
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
                    // action={
                    // <IconButton aria-label="settings">
                    //     <MoreVertIcon />
                    // </IconButton>
                    // }
                    title={`Table #${props.orderItem.tabeleNo}     Order #${props.orderItem.orderNo}`}
                    subheader={moment.utc(dateTime.asMilliseconds()).format("HH:mm:ss")}
                />
                <CardContent>
                    {/* <Typography variant="h5" component="h2">
                        be{bull}nev{bull}o{bull}lent
                    </Typography> */}
                    <Typography className={styleClasses.pos} color="textSecondary">
                        Category
                    </Typography>
                    <FormControl component="fieldset" className={styleClasses.formControl}>
                        {/* <FormLabel component="legend">Category</FormLabel> */}
                        <FormGroup>
                            <FormControlLabel className={styleClasses.formControlLabel}
                                control={<Checkbox value="Test Item #1" inputProps={{ 'aria-label': 'Test Item #1' }} />}
                                label="Test Item #1" />
                            <Typography variant="body2" component="p">
                                {"+ Ingredient #1"}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {"+ Ingredient #2"}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {"- Ingredient #3"}
                            </Typography>
                            <FormControlLabel className={styleClasses.formControlLabel}
                                control={<Checkbox value="Test Item #2" inputProps={{ 'aria-label': 'Test Item #2' }} />}
                                label="Test Item #2" />
                            <FormControlLabel className={styleClasses.formControlLabel}
                                control={<Checkbox value="Test Item #3" inputProps={{ 'aria-label': 'Test Item #3' }} />}
                                label="Test Item #3" />
                        </FormGroup>
                        {/* <FormHelperText>Helper Text</FormHelperText> */}
                    </FormControl>
                    <Typography variant="body2" component="p">
                        {" Remarks and Stuff"}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" size="small">Serve</Button>
                    <IconButton aria-label="settings">
                        <AccessibilityIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
}
