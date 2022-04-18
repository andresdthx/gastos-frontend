import React, { useCallback, useEffect, useState } from "react";
import LoadingBox from "../../components/utils/LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import {
  createNextExpense,
  listnextExpenses,
} from "../../actions/nextExpenseActions";
import { BottomSheet } from "react-spring-bottom-sheet";

export default function NextExpenseCreateScreen(props) {
  const dispatch = useDispatch();

  const { open, setOpen } = props;

  const nextExpenseCreate = useSelector((state) => state.nextExpenseCreate);
  const { nextExpense, loading: loadingCreate } = nextExpenseCreate;

  const [openLocal, setOpenLocal] = useState(false);
  const [name, setName] = useState();
  const [value, setValue] = useState();
  const [submit, setSubmit] = useState(false);

  const handlerSubmit = (e) => {
    e.preventDefault();
    const obj = {
      value,
      name,
      entryEntryId: 1,
    };
    setSubmit(true);
    dispatch(createNextExpense(obj));
  };

  const onDismiss = useCallback(() => {
    setOpenLocal(false);
    setTimeout(() => {
      setOpen(false);
    }, 500);
  }, [setOpen]);

  useEffect(() => {
    if (open) setOpenLocal(open);
  }, [open]);

  useEffect(() => {
    if (nextExpense && submit) {
      dispatch(listnextExpenses(1));
      onDismiss();
    }
  }, [nextExpense, dispatch, submit, onDismiss]);

  return (
    <BottomSheet
      open={openLocal}
      onDismiss={onDismiss}
      className="bottomSheet"
      snapPoints={({ minHeight }) => minHeight}
    >
      <div className="drawer-body">
        <form className="form-modal" onSubmit={handlerSubmit}>
          <div className="form-title">
            <div>Ingresar gasto</div>
          </div>

          <div>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del gasto"
            ></input>
          </div>
          <div>
            <input
              type="number"
              onChange={(e) => setValue(e.target.value)}
              placeholder="Valor"
            ></input>
          </div>
          <div>
            {loadingCreate ? (
              <LoadingBox />
            ) : (
              <button className="btn secundary" type="submit">
                Crear
              </button>
            )}
          </div>
        </form>
      </div>
    </BottomSheet>
  );
}
