import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGroup } from "../actions/utilsActions";

export default function FilterBotton() {
  const dispatch = useDispatch();
  const groupSet = useSelector((state) => state.groupSet);
  const { group } = groupSet;

  const handlerButton = () => {
    dispatch(setGroup(!group));
  };
  return (
    <div className="container">
      <div className="filter-content">
        <button onClick={() => handlerButton()} type="button">
          {group ? 'Desagrupar' : 'Agrupar'}
        </button>
      </div>
    </div>
  );
}
