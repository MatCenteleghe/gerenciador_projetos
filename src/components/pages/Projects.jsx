import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import ProjectCard from "../project/ProjectCard";
import Message from "../layouts/Message";
import Container from "../layouts/Container";
import Loading from "../layouts/Loading";
import LinkButton from "../layouts/LinkButton";
import styles from "./Projects.module.css";
import Search from "../layouts/Search";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projecMessage, setProjectMessage] = useState("");
  const [search, setSearch] = useState("");
  const location = useLocation();

  const apiURL = process.env.VITE_APP_API_URL;

  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch(`${apiURL}/projects`, {
        method: "GET",
        headers: { "Content-Type": "aplication/json" },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjects(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, []);

  function removeProject(id) {
    setProjectMessage("");
    fetch(`${apiURL}/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id));
        setProjectMessage("Projeto removido com sucesso!");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        {message && <Message msg={message} type="success" />}
        {projecMessage && <Message msg={projecMessage} type="success" />}
        <h1>Meus Projetos</h1>
        <LinkButton to="/newProject" text="Criar Projeto" />
      </div>
      <Search search={search} setSearch={setSearch} />
      <Container customClass="start">
        {projects.length > 0 &&
          projects
            .filter((project) =>
              project.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((project) => (
              <ProjectCard
                name={project.name}
                key={project.id}
                id={project.id}
                budget={project.budget}
                category={project.category.name}
                handleRemove={removeProject}
              />
            ))}
        {!removeLoading && <Loading />}
        {!removeLoading ||
          (projects.length === 0 && <p>Não há projetos cadastrados!</p>)}
      </Container>
    </div>
  );
}
export default Projects;
