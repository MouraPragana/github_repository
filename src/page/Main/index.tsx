import { ChangeEvent, FormEvent, memo, useCallback, useState } from "react";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { api } from "../../services/api";
import { BodyComponentMemoized } from "./components/BodyComponent";
import { HeaderComponentMemoized } from "./components/HeaderComponent";
import { FormComponentMemoized } from "./components/FormComponent";
import { Container } from "./styles";

interface IResponse {
  full_name: string;
}

export const MainComponentMemoized = memo(() => {
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
      <HeaderComponentMemoized />
      <FormComponentMemoized
        loading={loading}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        newRepo={newRepo}
        alert={alert}
      />
      <BodyComponentMemoized
        repositorios={repositorios}
        handleDelete={handleDelete}
      />
    </Container>
  );
});
