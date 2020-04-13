import * as React from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { Admin } from "./components/Admin";
import { CustomerEntry } from "./components/Customer";
import { Kitchen } from "./components/Kitchen";
import { Staff } from "./components/Staff";

class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <Route key="base" exact path="/"> <Redirect to="/home"/> </Route>
                    <Route key="home" exact path="/home" component={LandingPage} />
                    <Route key="admin" path="/admin" component={Admin} />
                    <Route key="customer" path="/customer/:table_number" component={CustomerEntry} />
                    <Route key="kitchen" path="/kitchen" component={Kitchen} />
                    <Route key="staff" path="/staff" component={Staff} />
                </div>
            </Router>
        );
    }
}

export default App;
