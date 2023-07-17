import { memo, useEffect, useState, useCallback } from "react";
import { IssuesList, PageActions } from "./styles";
import { useParams } from "react-router-dom";
import { api } from "../../../../services/api";

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

export const BodyComponent = memo(() => {
  const { repository } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [loadedIssuesData, setLoadedIssuesData] = useState<IloadedIssuesData[]>(
    []
  );

  const handlePage = useCallback(
    (action: string) => {
      setPage(action == "back" ? page - 1 : page + 1);
    },
    [page]
  );

  useEffect(() => {
    async function load() {
      setLoading(true);
      if (repository) {
        const issuesData = await api.get<IloadedIssuesData[]>(
          `/repos/${repository}/issues`,
          {
            params: {
              state: "open",
              page: page,
              per_page: 5,
            },
          }
        );

        setLoadedIssuesData(issuesData.data);
        setLoading(false);
      }
    }

    void load();
  }, [page, repository]);

  if (!loading) {
    return (
      <>
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
      </>
    );
  }
});
