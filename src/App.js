import {BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import FloatButton from './components/FloatButton';
import AlertScreen from './screens/AlertScreen';
import ChartScreen from './screens/ChartScreen';
import ExpenseScreen from './screens/ExpenseScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ExpenseCreateScreen from './screens/ExpenseCreateScreen';
import AlertCreateScreen from './screens/AlertCreateScreen';

function App() {

  return (
    <BrowserRouter>
        
        <Sidebar></Sidebar>
        <Switch>
          <Route path="*">
            <RouteGroup />
          </Route>
        </Switch>
        <FloatButton />
    </BrowserRouter>
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
          <Route path="/alert" component={AlertScreen}></Route>
          <Route path="/profile" component={ProfileScreen}></Route>
          <Route path="/chart" component={ChartScreen}></Route>
          <Route path="/expenses/:id" component={ExpenseScreen}></Route>
          <Route path="/create" component={ExpenseCreateScreen}></Route>
          <Route path="/create-alert" component={AlertCreateScreen}></Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default App;
