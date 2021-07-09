import "./App.css";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Crud from "./crud";
import Update from "./crud/Update";

function App() {
  return (
    <div className="App">
      <div id='wrapper'>
        <ToastContainer />
        <Switch>
          <Route exact path="/data" component={Crud} />
          <Route exact path="/update/:id" component={Update} />
        </Switch>
      </div>
    </div>
  );
}

export default App;