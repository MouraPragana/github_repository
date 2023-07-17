import { memo } from "react";
import { DeleteButton, List } from "./styles";
import { FaBars, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

interface IMainBodyMemo {
  repositorios: string[];
  handleDelete: (repo: string) => void;
}

export const BodyComponentMemoized = memo((info: IMainBodyMemo) => {
  return (
    <List>
      {info.repositorios.map((repo) => (
        <li key={repo}>
          <span>{repo}</span>
          <div>
            <Link to={`/repository/${encodeURIComponent(repo)}`}>
              <FaBars size={20} />
            </Link>
            <DeleteButton
              onClick={() => {
                info.handleDelete(repo);
              }}
              type="button"
            >
              <FaTrash size={18} />
            </DeleteButton>
          </div>
        </li>
      ))}
    </List>
  );
});
