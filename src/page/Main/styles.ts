import styled from "styled-components";

export const Container = styled.div`
  max-width: 720px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
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
