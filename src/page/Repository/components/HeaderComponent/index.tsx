import { memo } from "react";
import { IloadedRepositoryData } from "../..";
import { FaArrowLeft } from "react-icons/fa";
import { BackButton, Owner } from "./styles";

interface IRepositoryHeaderMemo {
  loadedRepositoryData: IloadedRepositoryData;
}

export const HeaderComponentMemoized = memo(
  ({ loadedRepositoryData }: IRepositoryHeaderMemo) => {
    return (
      <>
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
      </>
    );
  }
);
