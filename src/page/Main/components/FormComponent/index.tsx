import { ChangeEvent, FormEvent, memo } from "react";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { Form, SubmitButton } from "./style";

interface IFormComponent {
  newRepo: string;
  alert: boolean;
  loading: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface ISubmitComponent {
  loading: boolean;
}

const SubmitsButtonMemoized = memo(({ loading }: ISubmitComponent) => {
  return (
    <SubmitButton type="submit" disabled={loading}>
      {loading ? (
        <FaSpinner color="#FFF" size={14} />
      ) : (
        <FaPlus size={14} color="#FFF" />
      )}
    </SubmitButton>
  );
});

export const FormComponentMemoized = memo(
  ({
    alert,
    handleInputChange,
    handleSubmit,
    newRepo,
    loading,
  }: IFormComponent) => {
    return (
      <Form onSubmit={handleSubmit} $errorform={alert}>
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          value={newRepo}
          onChange={handleInputChange}
        />
        <SubmitsButtonMemoized loading={loading} />
      </Form>
    );
  }
);
