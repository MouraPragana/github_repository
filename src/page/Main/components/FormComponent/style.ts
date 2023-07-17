import styled, { css, keyframes } from "styled-components";

const animate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button`
  background: #0d2636;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${(props) =>
    props.disabled &&
    css`
      svg {
        animation: ${animate} 2s linear infinite;
      }
    `}
`;

interface IForm {
  $errorform: boolean;
}

export const Form = styled.form<IForm>`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid ${(props) => (props.$errorform ? "#FF0000" : "#ddd")};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 17px;
  }
`;
