import { Route } from "react-router-dom";
import AlertScreen from "./screens/Alert/AlertScreen";
import ChartScreen from "./screens/ChartScreen";
import ExpenseScreen from "./screens/Expense/ExpenseScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/User/LoginScreen";
import ProfileScreen from "./screens/User/ProfileScreen";
import RegisterScreen from "./screens/User/RegisterScreen";
import AlertCreateScreen from "./screens/Alert/AlertCreateScreen";
import ActivityScreen from "./screens/Activity/ActivityScreen";
import ActivityCreateScreen from "./screens/Activity/ActivityCreateScreen";
import EntryScreen from "./screens/Entry/EntryScreen";
import NextExpenseScreen from "./screens/nextExpense/NextExpenseScreen";
import SidebarMenu from "./components/SidebarMenu";
import { BrowserRouter } from "react-router-dom";
import RoutineScreen from "./screens/Rutine/RoutineScreen";

function App() {
  return (
    <BrowserRouter>
      <SidebarMenu />
      <Route path="/" component={HomeScreen} exact></Route>

      <Route path="/login" component={LoginScreen}></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <Route path="/profile" component={ProfileScreen}></Route>
      <Route path="/chart" component={ChartScreen}></Route>

      <Route path="/expenses/:id" component={ExpenseScreen}></Route>

      <Route path="/activities" component={ActivityScreen}></Route>
      <Route path="/activities-create" component={ActivityCreateScreen}></Route>

      <Route path="/alerts" component={AlertScreen}></Route>
      <Route path="/alerts-create" component={AlertCreateScreen}></Route>

      <Route path="/entries" component={EntryScreen}></Route>

      <Route path="/routines" component={RoutineScreen}></Route>

      <Route path="/next-expenses/:id" component={NextExpenseScreen}></Route>
    </BrowserRouter>
    // <HashRouter>
    // <SidebarMenu />
    // <Switch>
    // <Route path="*">
    //   <RouteGroup />
    // </Route>
    // </Switch>
    // </HashRouter>
  );
}

// function RouteGroup() {
//   let location = useLocation();

//   return (
//     <TransitionGroup>
//       <CSSTransition key={location.key} classNames="fade" timeout={300}>
//         <Switch location={location}>
//           <Route path="/" component={HomeScreen} exact></Route>

//           <Route path="/login" component={LoginScreen}></Route>
//           <Route path="/register" component={RegisterScreen}></Route>
//           <Route path="/profile" component={ProfileScreen}></Route>
//           <Route path="/chart" component={ChartScreen}></Route>

//           <Route path="/expenses/:id" component={ExpenseScreen}></Route>
//           <Route
//             path="/expenses-create"
//             component={ExpenseCreateScreen}
//             exact
//           ></Route>

//           <Route path="/activities" component={ActivityScreen}></Route>
//           <Route
//             path="/activities-create"
//             component={ActivityCreateScreen}
//           ></Route>

//           <Route path="/alerts" component={AlertScreen}></Route>
//           <Route path="/alerts-create" component={AlertCreateScreen}></Route>

//           <Route path="/entries" component={EntryScreen}></Route>
//           <Route path="/entries-create" component={EntryCreateScreen}></Route>

//           <Route
//             path="/next-expenses/:id"
//             component={NextExpenseScreen}
//           ></Route>
//           <Route
//             path="/next-expenses-create"
//             component={NextExpenseCreateScreen}
//           ></Route>
//         </Switch>
//       </CSSTransition>
//     </TransitionGroup>
//   );
// }

export default App;
