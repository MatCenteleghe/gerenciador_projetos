import styles from "./SingleProject.module.css";
import { parse, v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../layouts/Loading";
import Container from "../layouts/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layouts/Message";
import SubmitButton from "../form/SubmitButton";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";
import Search from "../layouts/Search";

function SingleProject() {
  const { id } = useParams();
  const [singleProject, setSingleProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  const apiURL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    setTimeout(() => {
      fetch(`${apiURL}/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setSingleProject(data);
          setServices(data.services);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, [id]);

  function editPost(singleProject) {
    //Validação de Orçamento
    if (singleProject.budget < singleProject.cost) {
      setMessage("O orçamento não pode ser menor que o custo do serviço!");
      setType("error");
      return false;
    }
    fetch(`${apiURL}/projects/${singleProject.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json  ",
      },
      body: JSON.stringify(singleProject),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setSingleProject(data);
        setShowProjectForm(false);
        setMessage("Projeto atualizado!");
        setType("success");
      })
      .catch((err) => console.log(err));
    setMessage("");
  }

  function createService() {
    //Último serviço

    const lastService =
      singleProject.services[singleProject.services.length - 1];
    lastService.id = uuidv4();
    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(
      singleProject.cost + parseFloat(lastServiceCost)
    );

    //validação de valor máximo
    if (newCost > parseFloat(singleProject.budget)) {
      setMessage("Orçamento ultrapassado, verifique o valor do serviço");
      setType("error");
      singleProject.services.pop();
      return false;
    }
    if (newCost < 0) {
      setMessage("O custo do serviço não pode ser menor que 0 ");
      setType("error");
      singleProject.services.pop();
      return false;
    }
    //adicionar custo do serviço para o custo total do projeto
    singleProject.cost = newCost;

    //Atualizar o projeto
    fetch(`${apiURL}/projects/${singleProject.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(singleProject),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setShowServiceForm(false);
      })
      .catch((err) => console.log(err));
  }

  function removeService(id, cost) {
    setMessage("");
    const servicesUpdated = singleProject.services.filter(
      (service) => service.id !== id
    );
    const singleProjectUpdated = singleProject;
    singleProjectUpdated.services = servicesUpdated;
    singleProjectUpdated.cost =
      parseFloat(singleProjectUpdated.cost) - parseFloat(cost);
    fetch(`${apiURL}/projects/${singleProjectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singleProjectUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setSingleProject(singleProjectUpdated);
        setServices(servicesUpdated);
        setMessage("Serviço removido com sucesso");
        setType("success");
      })
      .catch((err) => console.log(err));
  }
  function editService(name, cost, description) {}

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {singleProject.name ? (
        <div className={styles.singleProject_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {singleProject.name}</h1>

              <SubmitButton
                onClick={toggleProjectForm}
                text={`${!showProjectForm ? "Editar Projeto" : "Fechar"}`}
              />
              {!showProjectForm ? (
                <div className={styles.singleProject_info}>
                  <p>
                    <span>Categoria: </span>
                    {singleProject.category.name}
                  </p>
                  <p>
                    <span>Total Orçamento: </span>
                    R$ {singleProject.budget}
                  </p>
                  <p>
                    <span>Total Utilizado: </span>
                    R$ {singleProject.cost}
                  </p>

                  <p>
                    <span>Orçamento Restante: </span>
                    R$ {singleProject.budget - singleProject.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.singleProject_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={singleProject}
                  />
                </div>
              )}
            </div>

            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <SubmitButton
                onClick={toggleServiceForm}
                text={`${!showServiceForm ? "Adicionar serviço" : "Fechar"}`}
              />
              <div className={styles.singleProject_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={singleProject}
                  />
                )}
              </div>
            </div>
            <h2>Serviços:</h2>
            <Search search={search} setSearch={setSearch} />
            <Container customClass="start">
              {services.length > 0 &&
                services
                  .filter((service) =>
                    service.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((service) => (
                    <ServiceCard
                      id={service.id}
                      name={service.name}
                      cost={service.cost}
                      description={service.description}
                      key={service.id}
                      handleRemove={removeService}
                      handleEdit={editService}
                    />
                  ))}
              {services.length === 0 && <p>Não há serviços cadastrados</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
export default SingleProject;
