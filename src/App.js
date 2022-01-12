import {BrowserRouter, Route, Switch, useLocation, HashRouter } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import AlertScreen from './screens/Alert/AlertScreen';
import ChartScreen from './screens/ChartScreen';
import ExpenseScreen from './screens/Expense/ExpenseScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/User/LoginScreen';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ProfileScreen from './screens/User/ProfileScreen';
import RegisterScreen from './screens/User/RegisterScreen';
import ExpenseCreateScreen from './screens/Expense/ExpenseCreateScreen';
import AlertCreateScreen from './screens/Alert/AlertCreateScreen';
import ActivityScreen from './screens/Activity/ActivityScreen';
import ActivityCreateScreen from './screens/Activity/ActivityCreateScreen';

function App() {

  return (
    <HashRouter>
        <Sidebar />
        <Switch>
          <Route path="*">
            <RouteGroup />
          </Route>
        </Switch>
    </HashRouter>
  );
}

function RouteGroup() {

  let location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300}
      >
        <Switch location={location}>
          <Route path="/" component={HomeScreen} exact></Route>

          <Route path="/login" component={LoginScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/profile" component={ProfileScreen}></Route>
          <Route path="/chart" component={ChartScreen}></Route>

          <Route path="/expenses/:id" component={ExpenseScreen}></Route>
          <Route path="/expenses-create" component={ExpenseCreateScreen} exact></Route>

          <Route path="/activities" component={ActivityScreen}></Route>
          <Route path="/activities-create" component={ActivityCreateScreen}></Route>

          <Route path="/alerts" component={AlertScreen}></Route>
          <Route path="/alerts-create" component={AlertCreateScreen}></Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default App;
