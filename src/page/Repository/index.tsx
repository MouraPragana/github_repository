import { useParams } from "react-router-dom";

export function Repository() {
  const { repository } = useParams();

  return (
    <>
      <h1 style={{ color: "red" }}>{repository}</h1>
    </>
  );
}
