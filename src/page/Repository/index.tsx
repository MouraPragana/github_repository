import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { BodyComponentMemoized } from "./components/BodyComponent";
import { HeaderComponentMemoized } from "./components/HeaderComponent";
import { LoadingComponentMemoized } from "./components/LoadingComponent";
import { Container } from "./styles";

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

export function RepositoryComponent() {
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
      setLoading(true);
      if (repository) {
        const [issuesData, repositoryData] = await Promise.all([
          api.get<IloadedIssuesData[]>(`/repos/${repository}/issues`, {
            params: {
              state: "open",
              page: page,
              per_page: 5,
            },
          }),
          await api.get<IloadedRepositoryData>(`/repos/${repository}`),
        ]).finally(() => {
          setLoading(false);
        });

        setLoadedIssuesData(issuesData.data);
        setLoadedRepositoryData(repositoryData.data);
      }
    }

    void load();
  }, [repository, page]);

  const handlePage = useCallback(
    (action: string) => {
      setPage(action == "back" ? page - 1 : page + 1);
    },
    [page]
  );

  return (
    <Container>
      {loadedRepositoryData.owner && (
        <HeaderComponentMemoized loadedRepositoryData={loadedRepositoryData} />
      )}
      {loading ? (
        <LoadingComponentMemoized />
      ) : (
        <BodyComponentMemoized
          loadedIssuesData={loadedIssuesData}
          page={page}
          handlePage={handlePage}
        />
      )}
    </Container>
  );
}
