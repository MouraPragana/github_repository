import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./page/Main";
import { Repository } from "./page/Repository";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Main} />
        <Route path="/repository/:repository" Component={Repository} />
      </Routes>
    </BrowserRouter>
  );
}
