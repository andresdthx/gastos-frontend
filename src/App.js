import {BrowserRouter, Route } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import FloatButton from './components/FloatButton';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {

  return (
    <BrowserRouter>
        <Sidebar />
        <Route path="/" component={HomeScreen} exact></Route>
        <Route path="/login" component={LoginScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>

        <FloatButton />
    </BrowserRouter>
  );
}

export default App;
