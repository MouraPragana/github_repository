import { ChangeEvent, FormEvent, useState, useCallback } from "react";
import { FaGithub, FaPlus } from "react-icons/fa";
import { Container, Form, SubmitButton } from "./styles";
import { api } from "../../services/api";

interface IResponse {
  full_name: string;
}

export function Main() {
  const [newRepo, setNewRepo] = useState<string>("");
  const [repositorios, setRepositorios] = useState<string[]>([]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setNewRepo(e.target.value);
  }

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      async function submit() {
        const { data } = await api.get<IResponse>(`repos/${newRepo}`);
        setRepositorios((oldState) => [...oldState, data.full_name]);
        setNewRepo("");
      }

      void submit();
    },
    [newRepo, setNewRepo]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton type="submit">
          <FaPlus size={14} color="#FFF" />
        </SubmitButton>
      </Form>
      {repositorios.map((repo) => (
        <div>{repo}</div>
      ))}
    </Container>
  );
}
