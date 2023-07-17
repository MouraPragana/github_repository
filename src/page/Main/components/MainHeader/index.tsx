import { memo } from "react";
import { FaGithub } from "react-icons/fa";

export const MainHeader = memo(() => {
  return (
    <h1>
      <FaGithub size={25} />
      Meus Repositorios
    </h1>
  );
});
