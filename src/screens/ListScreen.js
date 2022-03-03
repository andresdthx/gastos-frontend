import React from "react";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/utils/LoadingBox";
import FilterBotton from "../components/FilterBotton";
import { useSelector } from "react-redux";
import { convertValue } from "../common/utils";
import CategoryDetails from "../components/Accordion/CategoryDetails";
import ExpenseDetails from "../components/ExpenseDetails";

export default function ListScreen(props) {
  const expenseList = useSelector((state) => state.expenseList);
  const { loading, expenses, error } = expenseList;

  const groupSet = useSelector((state) => state.groupSet);
  const { group } = groupSet;
  return (
    <div>
      <FilterBotton />

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="datatable">
          <div className="data-info container">
            <div className="data-card">
              <div>Gastos totales</div>
              <div>
                $
                {convertValue(
                  expenses.reduce((a, c) => a + parseInt(c.value), 0)
                )}
              </div>
              <div>
                <div className="data-card-circle"></div>
              </div>
              <div>
                <div className="data-card-circle-2"></div>
              </div>
              <div>
                <div className="data-card-circle-3"></div>
              </div>
            </div>
          </div>
          {/* <div className="data-table">
            <MDBDataTableV5
              hover
              data={datatable}
              searchTop
              paging={false}
              info={false}
              searchBottom={false}
            />
          </div> */}
          <div className="data-content">
            {group ? (
              <CategoryDetails expenses={expenses} props={props} />
            ) : (
              <ExpenseDetails expenses={expenses} props={props} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
