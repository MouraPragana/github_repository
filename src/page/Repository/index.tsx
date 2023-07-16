import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { Container } from "./styles";

export function Repository() {
  const { repository } = useParams();
  const [loadedRepositoryData, setLoadedRepositoryData] = useState<unknown>({});
  const [loadedIssuesData, setLoadedIssuesData] = useState<unknown>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      const nomeRepo = repository;

      if (nomeRepo) {
        const [repositoryData, issuesData] = await Promise.all([
          api.get(`/repos/${nomeRepo}`),
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

  return (
    <Container>
      <h1>teste</h1>
    </Container>
  );
}
