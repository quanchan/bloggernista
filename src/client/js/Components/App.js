import AuthenticationForm from "./AuthenticationForm";
import Header from "./Header"
import '../../style/App.scss';
import { Route, Switch, Redirect } from "react-router-dom"
function App() {
  return (
    // <div className="App">
    //   <h1>Bloggernista</h1>
    //   <AuthenticationForm/>
    // </div>
    //TODO: write header component
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path="/authentication" component={AuthenticationForm}/>
        <Redirect to="/authentication" />
      </Switch>
    </div>
  );
}

export default App;
