import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoutinesByUser } from "../../actions/routineActions";
import FloatButton from "../../components/FloatButton";

export default function RoutineScreen(props) {
  const dispatch = useDispatch();

  const routineByUserList = useSelector((state) => state.routineByUserList);
  const { routines } = routineByUserList;

  useEffect(() => {
    if (!routines) dispatch(getRoutinesByUser());
  }, [dispatch, routines]);

  return (
    <div className="container">
      <div className="routine-title">Rutinas</div>
      <div className="routine-content">
        {routines &&
          routines.map((routine) => (
            <div className="routine-card" key={routine.rutineId}>
              <div>icon</div>
              <div>{routine.name}</div>
              <div>
                {routine.initRecord} - {routine.initRecord}
              </div>
            </div>
          ))}
      </div>
      <FloatButton props={props} />
    </div>
  );
}
