import {BrowserRouter, Route } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import FloatButton from './components/FloatButton';
import AlertScreen from './screens/AlertScreen';
import ChartScreen from './screens/ChartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {

  return (
    <BrowserRouter>
        <Sidebar></Sidebar>

        <Route path="/" component={HomeScreen} exact></Route>
        <Route path="/login" component={LoginScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/alert" component={AlertScreen}></Route>
        <Route path="/profile" component={ProfileScreen}></Route>
        <Route path="/chart" component={ChartScreen}></Route>

        <FloatButton />
    </BrowserRouter>
  );
}

export default App;
