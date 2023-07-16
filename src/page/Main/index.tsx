import { ChangeEvent, FormEvent, memo, useCallback, useState } from "react";
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { api } from "../../services/api";
import { Container, DeleteButton, Form, List, SubmitButton } from "./styles";

interface IResponse {
  full_name: string;
}

interface IMainBodyMemo {
  repositorios: string[];
  handleDelete: (repo: string) => void;
}

interface ISubmitsButtonMemo {
  loading: boolean;
}

const MainHeader = memo(() => {
  return (
    <h1>
      <FaGithub size={25} />
      Meus Repositorios
    </h1>
  );
});

const SubmitsButton = memo((info: ISubmitsButtonMemo) => {
  return (
    <SubmitButton type="submit" disabled={info.loading}>
      {info.loading ? (
        <FaSpinner color="#FFF" size={14} />
      ) : (
        <FaPlus size={14} color="#FFF" />
      )}
    </SubmitButton>
  );
});

const MainBody = memo((info: IMainBodyMemo) => {
  return (
    <List>
      {info.repositorios.map((repo) => (
        <li key={repo}>
          <span>{repo}</span>
          <div>
            <Link to={`/repository/${encodeURIComponent(repo)}`}>
              <FaBars size={20} />
            </Link>
            <DeleteButton
              onClick={() => {
                info.handleDelete(repo);
              }}
              type="button"
            >
              <FaTrash size={18} />
            </DeleteButton>
          </div>
        </li>
      ))}
    </List>
  );
});

export const MainMemo = memo(() => {
  const [newRepo, setNewRepo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [repositorios, setRepositorios] = useLocalStorage<string[]>(
    "@repos",
    []
  ) as [string[], React.Dispatch<React.SetStateAction<string[]>>];

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
          console.log(data);
          setRepositorios((oldState) => [...oldState, data.full_name]);

          setNewRepo("");
        } catch {
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
      <MainHeader />
      <Form onSubmit={handleSubmit} $errorform={alert}>
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          value={newRepo}
          onChange={handleInputChange}
        />
        <SubmitsButton loading={loading} />
      </Form>
      <MainBody repositorios={repositorios} handleDelete={handleDelete} />
    </Container>
  );
});
