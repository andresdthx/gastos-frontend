import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listnextExpenses,
  updateNextExpense,
} from "../../actions/nextExpenseActions";
import { convertValue } from "../../common/utils";
import FloatButton from "../../components/FloatButton";
import MessageBox from "../../components/MessageBox";
import LoadingBox from "../../components/utils/LoadingBox";
import Checkbox from "@material-ui/core/Checkbox";

export default function NextExpenseScreen(props) {
  const dispatch = useDispatch();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const entryId = props.match.params.id;

  const [estimated, setEstimated] = useState();
  const [confirmed, setConfirmed] = useState();

  const nextExpensesList = useSelector((state) => state.nextExpensesList);
  const { nextExpenses, loading, error } = nextExpensesList;

  const handleNextExpense = (nextExpenseId, check) => {
    // dispatch(updateNextExpense(nextExpenseId, check));
    // dispatch(listnextExpenses(entryId));
  };

  useEffect(() => {
    if (!nextExpenses) {
      dispatch(listnextExpenses(entryId));
    }
  }, [nextExpenses, entryId, dispatch]);

  useEffect(() => {
    if (nextExpenses) {
      setEstimated(nextExpenses.reduce((a, c) => a + parseInt(c.value), 0));
      setConfirmed(
        nextExpenses.reduce((a, c) => {
          if (c.check) a += parseInt(c.value);
          return a;
        }, 0)
      );
    }
  }, [nextExpenses]);

  useEffect(() => {
    dispatch(listnextExpenses(entryId));
  }, [entryId, dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        nextExpenses && (
          <div className="next-expense-content">
            {nextExpenses.map((nextExpense) => (
              <div className="next-expense-list">
                <div className="next-expense-list-content">
                  <div>{nextExpense.name}</div>
                  <div>{convertValue(nextExpense.value)}</div>
                </div>
                <div>
                  <Checkbox
                    {...label}
                    checked={nextExpense.check}
                    onClick={() =>
                      handleNextExpense(
                        nextExpense.nextExpenseId,
                        !nextExpense.check
                      )
                    }
                  />
                </div>
              </div>
            ))}
            <div className="next-expense-list-calculated-content">
              <div className="next-expense-list-calculated">
                <div>Estimado</div>
                <div>{convertValue(estimated)}</div>
              </div>
              <div className="next-expense-list-calculated">
                <div>Confirmado</div>
                <div>{convertValue(confirmed)}</div>
              </div>
            </div>
          </div>
        )
      )}
      <FloatButton props={props} />
    </div>
  );
}
