import React from 'react';

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import StaffDashboard from '../Staff/StaffDashboard';

import { useLandingPageStyles } from "../../styles/landingPage";



export function LandingPage() {
    const styleClasses: any = useLandingPageStyles();


    const [page, setPage] = React.useState(renderLandingPage)

    function loadPage(page){
        setPage(page)
    }

    function renderLandingPage(){
        return (
            <Grid container className={styleClasses.root}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={3}>
                        <Grid key={'Admin'} item>
                            <Button variant="contained" /*onclick={() => loadPage(<AdminDashboard />)} */ className={styleClasses.paper}>Admin</Button>
                        </Grid>
                        <Grid key={'Customer'} item>
                            <Button variant="contained" /*onclick={() => loadPage(<AdminDashboard />)} */ className={styleClasses.paper}>Customer</Button>
                        </Grid>
                        <Grid key={'Staff'} item>
                            <Button variant="contained" onClick={() => loadPage(<StaffDashboard />)} className={styleClasses.paper}>Staff</Button>
                        </Grid>
                        <Grid key={'Kitchen'} item>
                            <Button variant="contained" /*onclick={() => loadPage(<AdminDashboard />)} */ className={styleClasses.paper}>Kitchen</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    

    return (page)

}





