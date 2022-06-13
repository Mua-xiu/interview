// import logo from './logo.svg';
// import './App.css';
import Login from "./login/Login";
import Main from "./main/Main";
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <HashRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />}></Route>  {/* 默认路由，实现路由的重定向 */}
          <Route path="/login" component={Login} />
          <Route path="/main" component={Main} />
        </Switch>
      </HashRouter>

      {/* <Login /> */}
    </div>
  );
}

export default App;
