import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectForm from "../project/ProjectForm";
import styles from "./NewProject.module.css";
import Message from "../layouts/Message";

function NewProject() {
  const history = useNavigate();
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  const apiURL = import.meta.env.VITE_APP_API_URL;

  function createPost(project) {
    //Inicializar o custo e serviços

    if (project.budget < 0) {
      setMessage("O orçamento não pode ser menor que 0");
      setType("error");
      return false;
    }
    project.cost = 0;
    project.services = [];

    fetch(`${apiURL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json)
      .then((data) => {
        console.log(data);
        //redirect
        history("/projects", {
          state: { message: "Projeto criado com sucesso! " },
        });
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className={styles.newproject_container}>
      <Message type={type} msg={message} />
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm
        handleSubmit={createPost}
        btnText="Criar Projeto"
        apiURL={apiURL}
      />
    </div>
  );
}
export default NewProject;
