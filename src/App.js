import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Meeting from './components/Meeting'
import './App.css';
function App() {
  return (
    <Router>
      <div className="App" >
        <header className='App-header'>
          <Link to='/'>Go to Home</Link>
        </header>
        <div className="container">
          <Switch >
            <Route exact path='/'>
              <Dashboard />
            </Route>
            <Route exact path="/meeting/add">
              <Meeting />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
