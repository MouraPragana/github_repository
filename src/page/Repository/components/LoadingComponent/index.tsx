import { memo } from "react";
import { Loading } from "./styles";

export const LoadingComponentMemoized = memo(() => {
  return (
    <Loading>
      <h1>Carregando...</h1>
    </Loading>
  );
});
