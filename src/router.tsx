import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainComponentMemoized } from "./page/Main";
import { RepositoryMemo } from "./page/Repository";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={MainComponentMemoized} />
        <Route path="/repository/:repository" Component={RepositoryMemo} />
      </Routes>
    </BrowserRouter>
  );
}
