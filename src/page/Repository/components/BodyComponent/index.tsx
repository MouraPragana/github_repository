import { memo } from "react";
import { IloadedIssuesData } from "../..";
import { IssuesList, PageActions } from "./styles";

interface IRepositoryBodyMemo {
  loadedIssuesData: IloadedIssuesData[];
  page: number;
  handlePage: (type: string) => void;
}

export const BodyComponentMemoized = memo(
  ({ handlePage, loadedIssuesData, page }: IRepositoryBodyMemo) => {
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
);
