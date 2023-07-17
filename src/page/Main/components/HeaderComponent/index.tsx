import { memo } from "react";
import { FaGithub } from "react-icons/fa";

export const HeaderComponentMemoized = memo(() => {
  return (
    <h1>
      <FaGithub size={25} />
      Meus Repositorios
    </h1>
  );
});
