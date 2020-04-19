import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { red, green, yellow } from "@material-ui/core/colors";

const priorityRed = red[600];
const priorityYellow = yellow[500];
const prioirityGreen = green[500];

export const orderTicketStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
        minWidth: 300,
    },
    cardBorderRed: {
        borderColor: priorityRed
    },
    cardBorderYellow: {
        borderColor: priorityYellow
    },
    cardBorderGreen: {
        borderColor: prioirityGreen
    },
    timerRed: {
        backgroundColor: priorityRed,
    },
    timerGreen: {
        backgroundColor: prioirityGreen,
    },
    timerYellow: {
        backgroundColor: priorityYellow,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    addIngredient: {
        marginLeft: theme.spacing(2),
        color: green[300],
    },
    removeIngredient: {
        marginLeft: theme.spacing(2),
        color: red[300],
    },
    pos: {
        marginBottom: 4,
    },
    formRoot: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(1),
        marginTop: 0,
    },
    formControlLabel: {
        marginBottom: 0,
    },
}));
