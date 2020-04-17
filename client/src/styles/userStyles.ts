import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const userStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        appBar: {
            backgroundColor: '#343A40'
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        paper: {
            height: 140,
            width: 100,
        },
        gridContainer: {
            paddingTop: '3%',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        orderTicketFilter: {
            flexGrow: 1,
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        noTicket: {
            marginLeft: '25%',
            marginTop: '25%',
        },
    })
);