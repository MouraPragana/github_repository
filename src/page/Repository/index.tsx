import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { HeaderComponentMemoized } from "./components/HeaderComponent";
import { LoadingComponentMemoized } from "./components/LoadingComponent";
import { Container } from "./styles";
import { BodyComponentMemoized } from "./components/BodyComponent";

interface IOwner {
  avatar_url: string;
  login: string;
}

export interface IloadedRepositoryData {
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

export interface IloadedIssuesData {
  id: number;
  html_url: string;
  title: string;
  labels: ILabel[];
  user: IUser;
}

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
    return <LoadingComponentMemoized />;
  }

  return (
    <Container>
      <HeaderComponentMemoized loadedRepositoryData={loadedRepositoryData} />
      <BodyComponentMemoized
        loadedIssuesData={loadedIssuesData}
        page={page}
        handlePage={handlePage}
      />
    </Container>
  );
});
