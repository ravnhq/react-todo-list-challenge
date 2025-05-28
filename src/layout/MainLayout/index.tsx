import "./index.scss";
import { ListContainer, SearcherContainer } from "../../containers";
export default function MainLayout() {
  return (
    <div className="mainContainer">
      <SearcherContainer />
      <ListContainer />
    </div>
  );
}
