import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import { api } from "../../services/api";
import { Container, DeleteButton, Form, List, SubmitButton } from "./styles";

interface IResponse {
  full_name: string;
}

export function Main() {
  const [newRepo, setNewRepo] = useState<string>("");
  const [repositorios, setRepositorios] = useState<string[]>(() => {
    const repositorios = localStorage.getItem("@repos") as string;

    try {
      return JSON.parse(repositorios) as string[];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("@repos", JSON.stringify(repositorios));
  }, [repositorios]);

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
        } catch {
          setAlert(true);
        } finally {
          setLoading(false);
        }
      }

      void submit();
    },
    [newRepo, repositorios]
  );

  const handleDelete = useCallback(
    (repo: string) => {
      const find = repositorios.filter((r) => r !== repo);
      setRepositorios(find);
    },
    [repositorios]
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
        {repositorios.map((repo) => (
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
