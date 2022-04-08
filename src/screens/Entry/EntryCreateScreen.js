import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import Drawer from "@material-ui/core/Drawer";
import LoadingBox from "../../components/utils/LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import { createEntry, listEntries } from "../../actions/entryActions";
import { getMonths } from "../../actions/utilsActions";

export default function EntryCreateScreen(props) {
  const dispatch = useDispatch();

  const monthsGet = useSelector((state) => state.monthsGet);
  const { months } = monthsGet;

  const entryCreate = useSelector((state) => state.entryCreate);
  const { entry, loading: loadingCreate } = entryCreate;

  const [value, setValue] = useState();
  const [month, setMonth] = useState();
  const [actualMonth, setActualMonth] = useState();

  const [submit, setSubmit] = useState(false);
  const [state, setState] = useState({ right: true });

  const toggleDrawer = (open) => {
    props.history.push("/");
    setState({ ...state, right: open });
  };

  const handleClose = useCallback(
    (open) => {
      if (state.right) props.history.push("/entries");
      setState({ ...state, right: open });
    },
    [setState, state, props]
  );

  const handlerSubmit = (e) => {
    e.preventDefault();
    const obj = {
      date: `${month}-${getDate().year}`,
      entry: value,
    };
    setSubmit(true);
    dispatch(createEntry(obj));
  };

  const getDate = () => {
    let newDate = new Date();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    month = month < 10 ? `0${month}` : `${month}`;
    return { month: month, year: year };
  };

  useEffect(() => {
    if (months) {
      setActualMonth(
        months.filter((month) => month.value === getDate().month)[0]
      );
    } else {
      dispatch(getMonths());
    }
  }, [months, dispatch]);

  useEffect(() => {
    if (actualMonth) setMonth(actualMonth.value);
  }, [actualMonth]);

  useEffect(() => {
    if (entry && submit) {
      dispatch(listEntries());
      handleClose(false);
    }
  }, [entry, dispatch, submit, handleClose]);

  return (
    <Drawer
      anchor={"right"}
      open={state.right}
      onClose={() => toggleDrawer(false)}
    >
      <div className="drawer-header">
        <Link to="/entries">
          <ArrowBackIcon
            className="drawer-back"
            onClick={() => toggleDrawer(false)}
          />
        </Link>
      </div>
      <div className="drawer-body">
        <form className="form-modal" onSubmit={handlerSubmit}>
          {/* {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>} */}
          <div className="form-title">
            <div>Calcular mes</div>
            <Divider />
          </div>

          <div>
            {months && actualMonth && (
              <Select
                placeholder="Seleccionar mes"
                onChange={(e) => setMonth(e.value)}
                defaultValue={actualMonth}
                options={months}
              />
            )}
          </div>
          <div>
            <input
              type="number"
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ingreso total mes"
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
    </Drawer>
  );
}
