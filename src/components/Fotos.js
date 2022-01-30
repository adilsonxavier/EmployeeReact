import React from "react";
import Foto from "./Foto";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Fotos() {
    const { id } = useParams()
    const [fotos, setFotos] = React.useState([]);
    const [recordForEdit, setRecordForEdit] = React.useState(null);


    React.useEffect(() => {
        refreshFotosList();
    }, []
    );

    const fotosAPI = (url = "http://localhost:33898/api/fotos") => {
        return {
            fetchAll: () => axios.get(url),
            fetchAllByEmployee: (id) => axios.get(url + "/GetFotosEmployee/" + id),
            create: (newRecord) => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + "/" + id, updatedRecord),
            delete: (id) => axios.delete(url + "/" + id),

        }
    }

    function refreshFotosList() {
        fotosAPI().fetchAllByEmployee(id)
            .then(resp => { setFotos(resp.data); console.log(resp.data) })
            .catch(err => console.log("o erro lina 26 foi : " + err));

    }


    return (
        <div className="row">
            <div className="col-md-12">
                <div className="jumbotron junbotron-fluid py-4">
                    <div className="container list">
                        <h1 className="display-4">Fotos do employee</h1>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <Foto
                    employeeId={id}
                    fotosApi={fotosAPI}
                    refreshFotosList={refreshFotosList}
                />
            </div>
            <div className="col-md-8">
                {
                    fotos.length > 0 &&
                    <ul>
                        {
                            (
                                fotos.map(
                                    (foto) => (
                                        <li key={foto.fotoId}>{foto.imageName} -- {foto.description}</li>
                                    )
                                ))
                        }
                    </ul>
                }

            </div>


        </div>
        );
}

