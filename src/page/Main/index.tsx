import { Container, Form, SubmitButton } from "./styles";
import { FaGithub, FaPlus } from "react-icons/fa";

export function Main() {
  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositorios
      </h1>

      <Form
        onSubmit={() => {
          console.log();
        }}
      >
        <input type="text" placeholder="Adicionar Repositórios" />

        <SubmitButton>
          <FaPlus size={14} color="#FFF" />
        </SubmitButton>
      </Form>
    </Container>
  );
}
