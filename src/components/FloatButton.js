import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import ExpenseCreateScreen from "../screens/Expense/ExpenseCreateScreen";
import EntryCreateScreen from "../screens/Entry/EntryCreateScreen";
import NextExpenseCreateScreen from "../screens/nextExpense/NextExpenseCreateScreen";

export default function FloatButton(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState();

  const routes = {
    expense: ExpenseCreateScreen,
    entry: EntryCreateScreen,
    nextExpense: NextExpenseCreateScreen,
  };

  const loadBottomSheet = () => {
    const path = props.props.location.pathname;

    console.log(path);
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
        setComponent("entry");
        break;

      default:
        if (path.includes("/next-expenses")) {
          setComponent("nextExpense");
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
