import { useEffect, useState, memo, useCallback } from "react";
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

interface IOwner {
  avatar_url: string;
  login: string;
}

interface IloadedRepositoryData {
  name: string;
  description: string;
  owner: IOwner;
}

interface ILabel {
  id: number;
  name: string;
}

interface IUser {
  avatar_url: string;
  login: string;
}

interface IloadedIssuesData {
  id: number;
  html_url: string;
  title: string;
  labels: ILabel[];
  user: IUser;
}

interface IRepositoryHeaderMemo {
  loadedRepositoryData: IloadedRepositoryData;
}

interface IRepositoryBodyMemo {
  loadedIssuesData: IloadedIssuesData[];
  page: number;
  handlePage: (type: string) => void;
}

const RepositoryHeaderMemo = memo((info: IRepositoryHeaderMemo) => {
  return (
    <>
      <BackButton to="/">
        <FaArrowLeft color="#000" size={30} />
      </BackButton>
      <Owner>
        <img
          src={info.loadedRepositoryData.owner.avatar_url}
          alt={info.loadedRepositoryData.owner.login}
        />
        <h1>{info.loadedRepositoryData.name}</h1>
        <p>{info.loadedRepositoryData.description}</p>
      </Owner>
    </>
  );
});

const RepositoryBodyMemo = memo((info: IRepositoryBodyMemo) => {
  return (
    <>
      <IssuesList>
        {info.loadedIssuesData.map((issue) => (
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
          disabled={info.page < 2}
          onClick={() => info.handlePage("back")}
        >
          Voltar
        </button>
        <p>Page: {info.page}</p>
        <button type="button" onClick={() => info.handlePage("next")}>
          Próxima
        </button>
      </PageActions>
    </>
  );
});

export const RepositoryMemo = memo(() => {
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
        const issuesData = await api
          .get<IloadedIssuesData[]>(`/repos/${repository}/issues`, {
            params: {
              state: "open",
              page: page,
              per_page: 5,
            },
          })
          .finally(() => {
            setLoading(false);
          });

        setLoadedIssuesData(issuesData.data);
      }
    }

    void load();
  }, [repository, page]);

  useEffect(() => {
    async function load() {
      console.log("caralho");
      if (repository) {
        const repositoryData = await api
          .get<IloadedRepositoryData>(`/repos/${repository}`)
          .finally(() => {
            setLoading(false);
          });

        setLoadedRepositoryData(repositoryData.data);
      }
    }

    void load();
  }, [repository]);

  const handlePage = useCallback(
    (action: string) => {
      setPage(action == "back" ? page - 1 : page + 1);
    },
    [page]
  );

  if (loading) {
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    );
  }

  return (
    <Container>
      <RepositoryHeaderMemo loadedRepositoryData={loadedRepositoryData} />
      <RepositoryBodyMemo
        loadedIssuesData={loadedIssuesData}
        page={page}
        handlePage={handlePage}
      />
    </Container>
  );
});
