import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { api } from "../../services/api";
import { Container, DeleteButton, Form, List, SubmitButton } from "./styles";

interface IResponse {
  full_name: string;
}

export function Main() {
  const [newRepo, setNewRepo] = useState<string>("");
  const [repositorios, setRepositorios] = useLocalStorage<[]>("@repos", []) as [
    string[],
    React.Dispatch<React.SetStateAction<string[]>>
  ];
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setNewRepo(e.target.value);
    setAlert(false);
  }

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      async function submit() {
        setLoading(true);
        setAlert(false);

        try {
          if (newRepo.trim() === "") {
            throw new Error("Você precisa indicar um repositório !");
          }

          const hasRepo = repositorios.some((repo) => repo === newRepo);

          if (hasRepo) {
            throw new Error("Repositorio duplicado !");
          }

          const { data } = await api.get<IResponse>(`repos/${newRepo}`);
          setRepositorios((oldState) => [...oldState, data.full_name]);
          setNewRepo("");
        } catch (e) {
          console.log(e);
          setAlert(true);
        } finally {
          setLoading(false);
        }
      }

      void submit();
    },
    [newRepo, repositorios, setRepositorios]
  );

  const handleDelete = useCallback(
    (repo: string) => {
      const find = repositorios.filter((r) => r !== repo);
      setRepositorios(find);
    },
    [repositorios, setRepositorios]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositorios
      </h1>
      <Form onSubmit={handleSubmit} $errorform={alert}>
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton type="submit" disabled={loading}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus size={14} color="#FFF" />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositorios.map((repo: string) => (
          <li>
            <span>{repo}</span>
            <div>
              <a href="">
                <FaBars size={20} />
              </a>
              <DeleteButton
                onClick={() => {
                  handleDelete(repo);
                }}
                type="button"
              >
                <FaTrash size={18} />
              </DeleteButton>
            </div>
          </li>
        ))}
      </List>
    </Container>
  );
}
