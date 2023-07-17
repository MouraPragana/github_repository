import styled from "styled-components";

export const IssuesList = styled.ul`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;

    & + li {
      margin-top: 12px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #0d2636;
    }

    div {
      flex: 1;
      margin-left: 12px;

      p {
        margin-top: 10px;
        font-size: 12px;
        color: #000;
      }
    }

    strong {
      font-size: 15px;

      a {
        text-decoration: none;
        color: #222;
        transition: 0.2s all ease-out;

        &:hover {
          color: #0071db;
        }
      }

      span {
        background: #222;
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        padding: 5px 7px;
        margin-left: 10px;
      }
    }
  }
`;

export const PageActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  button {
    outline: 0;
    border: 0;
    background: #222;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;

    transition: cubic-bezier();

    &:hover:not(:disabled) {
      scale: 1.05;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;
