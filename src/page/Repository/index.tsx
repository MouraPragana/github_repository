import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { BackButton, Container, Loading, Owner } from "./styles";

interface IloadedRepositoryData {
  name: string;
  description: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

export function Repository() {
  const { repository } = useParams();
  const [loadedRepositoryData, setLoadedRepositoryData] = useState(
    {} as IloadedRepositoryData
  );
  const [loadedIssuesData, setLoadedIssuesData] = useState<unknown>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      const nomeRepo = repository;

      if (nomeRepo) {
        const [repositoryData, issuesData] = await Promise.all([
          api.get<IloadedRepositoryData>(`/repos/${nomeRepo}`),
          api.get(`/repos/${nomeRepo}/issues`, {
            params: {
              state: "open",
              per_page: 5,
            },
          }),
        ]).finally(() => {
          setLoading(false);
        });

        setLoadedRepositoryData(repositoryData.data);
        setLoadedIssuesData(issuesData.data);
      }
    }

    void load();
  }, [repository]);

  if (loading) {
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    );
  }

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#000" size={30} />
      </BackButton>
      <Owner>
        <img
          src={loadedRepositoryData.owner.avatar_url}
          alt={loadedRepositoryData.owner.login}
        />
        <h1>{loadedRepositoryData.name}</h1>
        <p>{loadedRepositoryData.description}</p>
      </Owner>
    </Container>
  );
}
