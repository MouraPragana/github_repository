import { useEffect, useState, memo } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { api } from "../../../../services/api";
import { BackButton, Owner } from "./styles";

interface IloadedRepositoryData {
  name: string;
  description: string;
  owner: IOwner;
}

interface IOwner {
  avatar_url: string;
  login: string;
}

export const HeaderComponent = memo(() => {
  const { repository } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadedRepositoryData, setLoadedRepositoryData] = useState(
    {} as IloadedRepositoryData
  );

  useEffect(() => {
    async function load() {
      console.log("render !");
      setLoading(true);
      if (repository) {
        const repositoryData = await api.get<IloadedRepositoryData>(
          `/repos/${repository}`
        );

        setLoadedRepositoryData(repositoryData.data);
        setLoading(false);
      }
    }

    void load();
  }, [repository]);

  if (!loading) {
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
});
