import React, {useEffect, useState, Component} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {connect} from "react-redux";

import "../../../assets/scss/custom/pages/receptionist/receptionist.scss";

import {Link} from "react-router-dom";
import Header from "../HeaderReception";
import {Col, Container, Row, Table} from "reactstrap/es";
import Invalid from "../../Customer/Invalid";

// Import menuDropdown

function ViewFeedback () {

    const [stateFeedback, setFeedback] = useState([]);

    useEffect(() => {
        let stateFeedback = [
            {fid: 1, time:'20:00:00', food:'Rất ngon', service:'Rất hài lòng', content:'Sẽ ủng hộ nhà hàng dài dài'},
            {fid: 2, time:'20:00:00', food:'Rất ngon', service:'Rất hài lòng', content:'Sẽ ủng hộ nhà hàng dài dài'},
            {fid: 3, time:'20:00:00', food:'Rất ngon', service:'Rất hài lòng', content:'Sẽ ủng hộ nhà hàng dài dài'},
            {fid: 4, time:'20:00:00', food:'Rất ngon', service:'Rất hài lòng', content:'Sẽ ủng hộ nhà hàng dài dài'},
            {fid: 5, time:'20:00:00', food:'Rất ngon', service:'Rất hài lòng', content:'Sẽ ủng hộ nhà hàng dài dài'},
            {fid: 6, time:'20:00:00', food:'Rất ngon', service:'Rất hài lòng', content:'Sẽ ủng hộ nhà hàng dài dài'},
            {fid: 7, time:'20:00:00', food:'Rất ngon', service:'Rất hài lòng', content:'Sẽ ủng hộ nhà hàng dài dài'},
            {fid: 8, time:'20:00:00', food:'Rất ngon', service:'Rất hài lòng', content:'Sẽ ủng hộ nhà hàng dài dài'},
            {fid: 9, time:'20:00:00', food:'Rất ngon', service:'Rất hài lòng', content:'Sẽ ủng hộ nhà hàng dài dài'},
        ];

        setFeedback(
            stateFeedback.map(fe => {
                return {
                    select: false,
                    fid: fe.fid,
                    time: fe.time,
                    food: fe.food,
                    service: fe.service,
                    content: fe.content,
                };
            })
        );

    }, []);

    console.log("a: "+stateFeedback);

    return (
        <div>
            <div className="display-receptionist">
                <Header/>
                <div style={{marginTop:'100px', marginBottom:'60px'}} align="center" className="table-responsive">
                    <Table style={{width: 'auto',}} align="center" className="table mb-0">

                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Thời gian</th>
                            <th>Về món ăn</th>
                            <th>Về phục vụ</th>
                            <th>Nội dung</th>
                        </tr>
                        </thead>
                        <tbody>
                        {stateFeedback.map((fe, i)=> (
                            <tr>
                                <th>{fe.fid}</th>
                                <th>{fe.time}</th>
                                <th>{fe.food}</th>
                                <th>{fe.service}</th>
                                <th>{fe.content}</th>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            <div className='none-display-receptionist'>
                <Invalid/>
            </div>
        </div>
    )
}

export default ViewFeedback;