import * as React from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { useLandingPageStyles } from "../../styles/landingPage";

export function LandingPage() {

    const styleClasses: any = useLandingPageStyles();

    return (
        <Grid container className={styleClasses.root}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={3}>
                    <Grid key={'Admin'} item>
                        <Button variant="contained" className={styleClasses.paper}>Admin</Button>
                    </Grid>
                    <Grid key={'Customer'} item>
                        <Button variant="contained" className={styleClasses.paper}>Customer</Button>
                    </Grid>
                    <Grid key={'Staff'} item>
                        <Button variant="contained" className={styleClasses.paper}>Staff</Button>
                    </Grid>
                    <Grid key={'Kitchen'} item>
                        <Button variant="contained" className={styleClasses.paper}>Kitchen</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
