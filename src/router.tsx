import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainComponent } from "./page/Main";
import { RepositoryComponent } from "./page/Repository";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={MainComponent} />
        <Route path="/repository/:repository" Component={RepositoryComponent} />
      </Routes>
    </BrowserRouter>
  );
}
