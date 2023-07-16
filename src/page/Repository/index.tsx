import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import {
  BackButton,
  Container,
  IssuesList,
  Loading,
  Owner,
  PageActions,
} from "./styles";

interface IloadedRepositoryData {
  name: string;
  description: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

interface IloadedIssuesData {
  id: number;
  html_url: string;
  title: string;
  labels: {
    id: number;
    name: string;
  }[];
  user: {
    avatar_url: string;
    login: string;
  };
}

export function Repository() {
  const { repository } = useParams();
  const [loadedRepositoryData, setLoadedRepositoryData] = useState(
    {} as IloadedRepositoryData
  );
  const [loadedIssuesData, setLoadedIssuesData] = useState<IloadedIssuesData[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function load() {
      if (repository) {
        const [repositoryData, issuesData] = await Promise.all([
          api.get<IloadedRepositoryData>(`/repos/${repository}`),
          api.get<IloadedIssuesData[]>(`/repos/${repository}/issues`, {
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

  useEffect(() => {
    async function loadIssue() {
      if (repository) {
        const response = await api.get<IloadedIssuesData[]>(
          `/repos/${repository}/issues`,
          {
            params: {
              state: "open",
              page: page,
              per_page: 5,
            },
          }
        );

        setLoadedIssuesData(response.data);
      }
    }

    void loadIssue();
  }, [page, repository]);

  function handlePage(action: string) {
    setPage(action == "back" ? page - 1 : page + 1);
  }

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
      <IssuesList>
        {loadedIssuesData.map((issue) => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />

            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>
                {issue.labels.map((label) => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>

              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>
      <PageActions>
        <button
          type="button"
          disabled={page < 2}
          onClick={() => handlePage("back")}
        >
          Voltar
        </button>
        <p>Page: {page}</p>
        <button type="button" onClick={() => handlePage("next")}>
          Próxima
        </button>
      </PageActions>
    </Container>
  );
}
