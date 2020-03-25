import { makeStyles, createStyles } from "@material-ui/core/styles";

export const useLandingPageStyles = makeStyles(() =>
    createStyles({
        root: {
        flexGrow: 1,
            paddingTop: '3%'
      },
      paper: {
            height: 140,
            width: 100,
        }
    })
);
