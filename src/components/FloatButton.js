import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import ExpenseCreateScreen from "../screens/Expense/ExpenseCreateScreen";

export default function FloatButton(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState();

  const routes = {
    expense: ExpenseCreateScreen,
    activity: ExpenseCreateScreen,
  };

  const loadBottomSheet = () => {
    const path = props.props.location.pathname;

    switch (path) {
      case "/":
        setComponent("expense");
        break;
      case "/activities":
        setOpen("/activities-create");
        break;
      case "/alerts":
        setOpen("/alerts-create");
        break;
      case "/entries":
        setOpen("/entries-create");
        break;

      default:
        if (path.includes("/next-expenses")) {
          setOpen("/next-expenses-create");
        }
        break;
    }

    setOpen(true);
  };

  const Scene = routes[component];

  return (
    <div>
      {userInfo && (
        <div className="floating-button" onClick={loadBottomSheet}>
          <button className="btoncito">
            <AddIcon />
          </button>
        </div>
      )}
      {open && <Scene setOpen={setOpen} open={open} />}
    </div>
  );
}
