import styles from "./App.module.scss";
import { Form } from "./components/form/Form";
import { Navbar } from "./components/navbar/Navbar";
import "@radix-ui/themes/styles.css";

function App() {
  return (
    <div className={styles.container}>
      <Navbar />
      <Form />
    </div>
  );
}

export default App;
