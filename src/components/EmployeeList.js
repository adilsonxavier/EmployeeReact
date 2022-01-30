import React from "react";
import Employee from "./Employee";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EmployeeList() {


    const [employeeList, setEmployeeList] = React.useState([]);
    const [recordForEdit, setRecordForEdit] = React.useState(null);

    React.useEffect(() => {
        refreshEmployeeList();
    },[]
    );

    const employeeAPI = (url = "http://localhost:33898/api/employee") => {
        return {
            fetchAll: () => axios.get(url),
            create: (newRecord) => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url +"/"+ id, updatedRecord),
            delete: (id) => axios.delete(url + "/"+ id)
        }
    }

    function  refreshEmployeeList (){
        employeeAPI().fetchAll()
            .then(resp => { setEmployeeList(resp.data);console.log(resp.data) })
            .catch(err => console.log("o erro lina 26 foi : "+err));

    }
    const showRecordDetails = (data) => {
        setRecordForEdit(data);
        // console.log("clicado");

    }

    const onDelete = (e, id) => {
        //e.preventDefault()

        // Como o botão está dentro de uma div que já tinha seu proprio onClick, precisa do stopPropagation senão tanto o click
        // do botão quanto da div serão acionados
        e.stopPropagation();
        if (confirm("tem certeza ?")) {
            employeeAPI().delete(id)
                .then(resp => refreshEmployeeList())
                .catch(erro => console.log(erro));
        }

    }

    const imageCard = data => (
        <div className="card item" key={data.employeeId} onClick={() => { showRecordDetails(data) }}>
            <img src={data.imageSrc} className="card-img-top rounded-circle" style={ estiloimagem} ></img>
            <div className="card-body">
                <h5>{data.employeeName}</h5>
                <h5 style={{fontWeight:"bold"}}>Id: {data.employeeId}</h5>
                <span>{data.occupation}</span>
            </div>
            <button onClick={(e) => onDelete(e, parseInt(data.employeeId))} >Deletar</button>
            <Link to={`/fotos/${data.employeeId}`} > Fotos </Link>

        </div>
        );

    const addOrEdit = (formData, onSuccess) => {
        if (formData.get("employeeId") == "0") {
            employeeAPI().create(formData)
                .then(resp => {
                    console.log(resp); onSuccess(); refreshEmployeeList();
                })
                .catch((err) => { "erro el 19 " + console.log(err) });
        }
        else {

            employeeAPI().update(formData.get("employeeId"),formData)
                .then(resp => {
                    console.log("erro foi "+ resp); onSuccess(); refreshEmployeeList();
                })
                .catch((err) => { "erro el 60 " + console.log(err) });
        }

    }

    const estiloimagem = {
        width: "200px",
        height: "200px"
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
                    recordForEdit={recordForEdit}
                />
            </div>
            <div className="col-md-8">
                     {
                        employeeList.length > 0 &&
                            employeeList.map(
                                (employee) => (
                                    imageCard(employee)
                                    )
                            )
                    }

            </div>


        </div>
        );
}