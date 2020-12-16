import AuthenticationForm from "./AuthenticationForm";
import Header from "./Header"
import AdminPage from './AdminPage'
import UserPage from './UserPage'
import '../../style/App.scss';
import { Route, Switch, Redirect } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path="/authentication" component={AuthenticationForm}/>
        <Route exact path="/api/posts/admin" component={AdminPage}/>
        <Route exact path="/api/posts/user" component={UserPage}/>
        <Redirect to="/authentication" />
      </Switch>
    </div>
  );
}

export default App;
