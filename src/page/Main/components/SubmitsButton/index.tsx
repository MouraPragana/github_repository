import { memo } from "react";
import { SubmitButton } from "./style";
import { FaPlus, FaSpinner } from "react-icons/fa";

interface ISubmitsButtonMemo {
  loading: boolean;
}

export const SubmitsButton = memo((info: ISubmitsButtonMemo) => {
  return (
    <SubmitButton type="submit" disabled={info.loading}>
      {info.loading ? (
        <FaSpinner color="#FFF" size={14} />
      ) : (
        <FaPlus size={14} color="#FFF" />
      )}
    </SubmitButton>
  );
});
