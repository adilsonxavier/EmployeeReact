import React from "react";

import { useParams } from "react-router-dom";
import axios from "axios";

export default function Skills() {
    const { id } = useParams()
    const [skills, setSkills] = React.useState([]);
    const [recordForEdit, setRecordForEdit] = React.useState(null);


    React.useEffect(() => {
        refreshSkillsList();
    }, []
    );

    const skillsAPI = (url = "http://localhost:33898/api/skills") => {
        return {
            fetchAll: () => axios.get(url),
            fetchAllByEmployee: (id) => axios.get(url + "/GetSkillsEmployee/" + id),
            create: (newRecord) => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + "/PutSkillsEmployee/" + id, updatedRecord),
            delete: (id) => axios.delete(url + "/" + id),

        }
    }

    function refreshSkillsList() {
        skillsAPI().fetchAllByEmployee(id)
            .then(resp => setSkills(resp.data))
            .catch(err => console.log("o erro lina 26 foi : " + err));

    }


    const handleOnChange = (e, index) => {

        const updatedCheckedState = skills.map((skill, position) =>
        {
            let updateElement = {
                //skillId: skill.skillId,
                //skillName : skill.skillName,
                ...skill,
                checked: position == index ? !skill.checked : skill.checked
            }
            return updateElement;
        });
        setSkills(updatedCheckedState);
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        console.log(skills);
        skillsAPI().update(id, skills)
            .then(data => console.log(data))
            .catch(erro => console.log(erro));

    }
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="jumbotron junbotron-fluid py-4">
                    <div className="container list">
                        <h1 className="display-4">Skills do employee</h1>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
            </div>
            <div className="col-md-8">
                {
                    skills.length > 0 &&
                    <form onSubmit={handleFormSubmit}>
                        <ul>
                            {
                                (
                                    skills.map(
                                        (skill, index) => (

                                            <div className="left-section" key={skill.skillId}>
                                                <input
                                                    type="checkbox"
                                                    id={skill.skillId}
                                                    name={skill.skillName}
                                                    value={skill.skillName}
                                                    checked={skill.checked}
                                                    onChange={(e) => handleOnChange(e, index)}
                                                />
                                                <label htmlFor={skill.skillName}>{skill.skillName} -indice: {index}</label>
                                            </div>
                                        )
                                    ))
                            }
                        </ul>
                        <button type="submit">Submit</button>
                    </form>
                }

            </div>


        </div>
        );
}
