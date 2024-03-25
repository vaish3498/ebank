import {Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/ebank/login" component={LoginForm} />
      <Route exact path="/" component={Home} />
      <NotFound />
    </Switch>
  </div>
)

export default App
