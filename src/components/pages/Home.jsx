import styles from "./Home.module.css";
import savings from "../../img/savings.svg";
import LinkButton from "../layouts/LinkButton";
function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Bem vindo ao <span>Budget Control MT</span>
      </h1>
      <p>Comece a gerenciar seus projetos agora mesmo</p>
      <LinkButton to="/newProject" text="Criar Projeto" />
      <img src={savings} alt="imageBC"></img>
    </section>
  );
}
export default Home;
