import React from "react";
import EmployeeList from "./components/EmployeeList";
import Fotos from "./components/Fotos";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"


export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <EmployeeList />
                </Route>

                <Route exact path="/">
                    <EmployeeList />
                </Route>


                <Route path="/fotos/:id">
                    <Fotos />
                </Route>

            </Switch>
        </Router>


    );
}

<div className="container">
    <EmployeeList />
</div>