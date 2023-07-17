import styled from "styled-components";

export const List = styled.ul`
  list-style: none;
  margin-top: 20px;

  li {
    padding: 15px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #0d2636;
      text-decoration: none;
      padding: 8px 7px;
    }
  }
`;

export const DeleteButton = styled.button`
  background: transparent;
  color: #0d2636;
  border: 0;
  padding: 8px 7px;
  outline: 0;
  border-radius: 4px;
`;
