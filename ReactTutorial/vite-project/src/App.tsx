import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import { useState } from "react";

function App() {
  // let items = ["New York", "San Frnasisco", "Tokyo", "London", "Paris"];

  // const handleSelectItem = (item: string) => {
  //   console.log(item);
  // }

  // return (
  //   <div>
  //     <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem}/>
  //   </div>
  // );
  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <div>
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>
          <h1>ohhhhhh yeaaaaaaaaaaaaaah</h1>
        </Alert>
      )}
      <Button onClick={() => setAlertVisibility(true)}>Click Me Daddy</Button>
    </div>
  );
}

export default App;
