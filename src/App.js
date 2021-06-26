import "./App.css";
import Logup from "./NavBar/logUp";
import Datapost from "./post/datapost";
import Createpost from "./createpost/CreatePost";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserDetails from "./user";
import Todo from "./todo/todo";
function App() {
  return (
    <div>
      <Router>
        <Logup></Logup>
        <Switch>
          <Route path="/" exact component={Datapost} />
          <Route path="/create" component={Createpost} />
          <Route path="/detail" component={UserDetails} />
          <Route path="/todo" component={Todo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
