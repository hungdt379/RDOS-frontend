import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-super-responsive-table";
import { Card, CardBody, CardTitle } from "reactstrap";
import { getAllTopThank } from "../../../../store/statistics/actions";
import ThankItem from "./ThankItem";

const TopThank = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTopThank({ pageIndex: 1, pageSize: 5 }));
  }, []);

  let rankInfo = useSelector(
    (state) => state?.Statistics.topThank.dataTopThanks?.data
  );

  (function checkTypeRankInfo() {
    if (
      rankInfo &&
      Object.keys(rankInfo).length === 0 &&
      rankInfo.constructor === Object
    ) {
      rankInfo = [];
    }
  })();

  return (
    <React.Fragment>
      <Card className="body-card">
        <CardBody>
          <CardTitle>
            <p className="ranks">Nhà truyền thống</p>
          </CardTitle>
          <div className="table-responsive">
            <Table className="table mb-0">
              <thead></thead>
              <tbody>
                {rankInfo?.map((info, _id) => (
                  <ThankItem inforUser={info} userId={_id} key={_id} />
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default TopThank;
