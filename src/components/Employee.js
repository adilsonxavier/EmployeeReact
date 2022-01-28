import React from "react";
import logo from "../img/costs_logo.png";

export default function Employee(props) {

    const { addOrEdit } = props;

    const defaultImageSrc = logo;

    const initialFieldValues = {
        employeeId: 0,
        employeeName: "",
        occupation: "",
        imageName:"",
        imageSrc: defaultImageSrc,
        imageFile: null
    }

    const [values, setValues] = React.useState(initialFieldValues);
    const [errors, setErrors] = React.useState({});

    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues(
                    {
                        ...values,
                        imageFile,
                        imageSrc: x.target.result,
                    }
                );
            }
            reader.readAsDataURL(imageFile);
            // console.log(imageFile);
        }
        else {
            alert("dfas");
            setValues(
                {
                    ...values,
                    imageFile: null,
                    imageSrc: defaultImageSrc
                }
            );
        }
    }
    const validate = () => {
        let temp = {};
        temp.employeeName = values.employeeName == "" ? false : true;
        temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
        setErrors(temp);
        console.log(temp);
        return Object.values(temp).every(x => x == true);

        //O Object.values(temp) retorna um array com os valores dos elementos do objeto tempo ( só os valores sem os nomes das pro-
        // priedades ) no caso [bool, bool]

        // O Array.every(função) checa se todos os valores do array passam pela função dentro do parâmetro e retorna true apenas se
        // todos os valores passarem pelo teste
        // No caso .every(x => x == false); retorna true (todos os campos ok) apenas se o valor de todos os elementos de temp
        // forem false ( sem erro)
    }


    const resetForm = () => {
        setValues(initialFieldValues);
        document.getElementById("image-uploader").value = null;
        console.log("reset form - success")
        setErrors({});
    }
    const resetImage = (e) => {
        e.preventDefault();
        setValues(
            {
                ...values,
                imageFile: null,
                imageSrc: defaultImageSrc
            }
        );
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        console.log("85");
        if (validate()) {
            const formData = new FormData();
            formData.append("employeeId", values.employeeId);
            formData.append("employeeName", values.employeeName);
            formData.append("occupation", values.occupation);
            formData.append("imageName", values.imageName);
            formData.append("imageFile", values.imageFile);

            addOrEdit(formData, resetForm);


           console.log("ok 97")
        }
        else {
            console.log("n ok")
        }
    }

    const handleInputChange = e => {
       // const [name, value] = e.target;
        setValues(
            {
                ...values,
                [e.target.name]: e.target.value
            }

        );
        //console.log(values);

    }


  //  const applyErrorClass = (field) => ( (field in errors && errors[field] == false) ? " invalid-field" : "");
    const applyErrorClass = (field) => { return (field in errors && errors[field] == false) ? " invalid-field" : "" };
    // (field in errors ) retorna true se todos se a propriedade com o nome field existir no objeto errors

    return (

        <>
            <p> employee</p>
            <form onSubmit={handleFormSubmit}>
                <div className="card">
                    <img src={values.imageSrc} onChange={showPreview} id="image-uploader" />
  
                    <div className="card-body">
                        <input type="file"
                            accept="image/*"
                            onChange={showPreview}
                            className={"form-control-file" + applyErrorClass("imageSrc")}
                           
                        />
                        <button onClick={resetImage} >Limpar Imagem</button>
                    </div>
                    <div className="card-body">
                        <input type="text" name="employeeName"
                            value={values.employeeName}
                            onChange={handleInputChange}
                            placeholder="employee name"
                            className={"form-control" + applyErrorClass("employeeName")}
                        />
                    </div>
                    <div className="card-body">
                        <input type="text" name="occupation"
                            value={values.occupation}
                            onChange={handleInputChange}
                            placeholder="occupation"
                        />
                    </div>
                    <div className="card-body">
                        <button type = "submit">Submit</button>
                    </div>
                </div>
            </form>


        </>
        );
}