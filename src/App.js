import React from "react";
import EmployeeList from "./components/EmployeeList";
import Fotos from "./components/Fotos";
import Skills from "./components/Skills";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import CheckBoxList from "./components/CheckBoxList";


export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <EmployeeList />
                </Route>


                <Route path="/fotos/:id">
                    <Fotos />
                </Route>

                <Route path="/skills/:id">
                    <Skills />
                </Route>
                <Route path="/checkboxlist">
                    <CheckBoxList />
                </Route>
            </Switch>
        </Router>


    );
}

<div className="container">
    <EmployeeList />
</div>