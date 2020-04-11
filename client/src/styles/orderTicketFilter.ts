import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const orderTicketFilterStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        scroller: {
            flexGrow: 0
        }
    })
);