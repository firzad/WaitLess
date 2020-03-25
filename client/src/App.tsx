import * as React from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { Admin } from "./components/Admin";
import { Customer } from "./components/Customer";
import { Kitchen } from "./components/Kitchen";
import { Staff } from "./components/Staff";

class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/"> <Redirect to="/home"/> </Route>
                    <Route exact path="/home" component={LandingPage} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/customer" component={Customer} />
                    <Route path="/kitchen" component={Kitchen} />
                    <Route path="/staff" component={Staff} />
                </div>
            </Router>
        );
    }
}

export default App;
