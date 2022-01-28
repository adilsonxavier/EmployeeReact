import React from "react";
import Employee from "./Employee";
import axios from "axios";

export default function EmployeeList() {

    const employeeAPI = (url = "http://localhost:33898/api/employee") => {
        return {
            fetchAll: () => axios.get(url),
            create: (newRecord) => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: (id) => axios.delete(url + id)
        }
    }

    const addOrEdit = (formData, onSuccess) => {
          employeeAPI().create(formData)
            .then(resp => { console.log(resp); onSuccess() })
            .catch((err) => {"erro el 19 "+ console.log(err) });

    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="jumbotron junbotron-fluid py-4">
                    <div className="container list">
                        <h1 className="display-4">Employee register</h1>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <Employee
                    addOrEdit={addOrEdit}
                />
            </div>


        </div>
        );
}