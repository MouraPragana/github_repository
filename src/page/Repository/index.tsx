import { BodyComponent } from "./components/BodyComponent";
import { HeaderComponent } from "./components/HeaderComponent";
import { Container } from "./styles";

export function RepositoryComponent() {
  return (
    <Container>
      <HeaderComponent />
      <BodyComponent />
    </Container>
  );
}
