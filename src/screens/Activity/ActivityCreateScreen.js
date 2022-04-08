import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import { useDispatch } from "react-redux";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { createActivity } from "../../actions/activityActions";

export default function ActivityCreateScreen(props) {
  const dispatch = useDispatch();

  const [state, setState] = useState({ right: true });
  const [activity, setActivity] = useState("");
  const [date, setDate] = useState("");

  const toggleDrawer = (open) => {
    props.history.push("/activities");
    setState({ ...state, right: open });
  };

  const handlerSubmit = (e) => {
    dispatch(createActivity(activity, date));
  };

  return (
    <Drawer
      anchor={"right"}
      open={state.right}
      onClose={() => toggleDrawer(false)}
    >
      <div className="drawer-header">
        <ArrowBackIcon
          className="drawer-back"
          onClick={() => toggleDrawer(false)}
        />
      </div>
      <div className="drawer-body">
        <div>Crear actividad</div>
        <form className="form-modal" onSubmit={handlerSubmit}>
          <div>
            <input
              type="text"
              onChange={(e) => setActivity(e.target.value)}
              placeholder="Actividad"
            ></input>
          </div>
          <div>
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              placeholder="Fecha"
            ></input>
          </div>
          <div>
            <button className="btn secundary" type="submit">
              Crear
            </button>
          </div>
        </form>
      </div>
    </Drawer>
  );
}
