import { useParams } from "react-router-dom";

export function Repository() {
  const { repository } = useParams();

  return (
    <>
      <h1>{repository}</h1>
    </>
  );
}
