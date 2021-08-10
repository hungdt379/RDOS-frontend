import React, {useState, useEffect} from "react";
import { useLocation, withRouter} from "react-router-dom";
import NotFound from "../../Authentication/Page401";
import Header from "../home/myHeader";
//scss
import "../../../assets/scss/custom/pages/waiter/changeTable.scss";
import Invalid from "../../Customer/Invalid";
import Footer from "../../../components/RdosCustomerLayout/Footer";
import {connect} from "react-redux";
import {postChangeTableRequest} from "../../../store/post/actions";
import {apiError} from "../../../store/auth/login/actions";
import {getCloseTableRequest} from "../../../store/notifications/actions";
import TableNav from "./TableNav";
import {Modal} from "reactstrap";

const ChangeTable = (props) => {
    const [role, setrole] = useState([]);

    const location = useLocation();

    const [openLoadPa, setOpenLoadPa] = useState(false);

    const {dataCloseTablePage} = props;

    const [tableId, setTableID] = useState();

    const [tableChoose, setTableChoose] = useState('');

    const changeTable = () => {
        const table = {
            from_table_id: location.state._id,
            to_table_id: tableId,
        }
        props.postChangeTableRequest(table);

    }

    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setrole(obj.data.user.role);
        }

        setTableID(null);

        props.getCloseTableRequest();
    }, []);


    const table = {
        _id: location.state._id,
        username: location.state.username,
        navChoose: '3',
    }

    return (
        <React.Fragment>
            <div className="display-customer">
                {(role === 'w') ? (
                    <div className="container_detail">
                        <div style={{
                            position: 'fixed',
                            width: '100%',
                            zIndex: '100',
                            backgroundColor:'#ffffff'
                        }}>
                            <Header username={location.state.username} />
                            <TableNav item={table}/>
                        </div>
                        <div style={{textAlign: "center", justifyContent: "center", paddingTop: '140px'}}>
                            <div className="list">
                                {dataCloseTablePage?.map((d, index) => (
                                        <label key={index}>
                                            <input
                                                type="checkbox"
                                                value={d._id}
                                                id={d._id}
                                                style={{opacity: '0'}}
                                                name="tableCheck"
                                                className="check-table"
                                                onChange={(e) => (
                                                    setTableChoose(e.target.value),
                                                        setTableID(d._id)
                                                )}
                                                checked={tableChoose === d._id}
                                            />
                                            <div htmlFor={d._id} className="page">
                                                <div className="content_all">
                                                    <span className="two">{d.username}</span>
                                                </div>
                                            </div>
                                            {/*<div for={d._id} className="close-table-item"*/}
                                            {/*     // key={index}*/}
                                            {/*     // onClick={() => {*/}
                                            {/*     //     setTableID(d._id);*/}
                                            {/*     // }}*/}
                                            {/*>*/}
                                            {/*    <div for={d._id} className="page">*/}
                                            {/*        <div className="content_all">*/}
                                            {/*            <span className="two">{d.username}</span>*/}
                                            {/*        </div>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </label>

                                    )
                                )}
                            </div>

                            <p className="btn-change" onClick={()=>{
                                changeTable();
                                setOpenLoadPa(true);
                                setTimeout(() => {
                                    setOpenLoadPa(false)
                                    props.history.push("/waiter-view-all-table");

                                }, 1000)
                            }}>Lưu</p>
                        </div>
                    </div>
                ) : (<NotFound/>)}
                <Footer/>
                <Modal align="center" style={{
                    width: '350px',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    height: '100px',
                    marginTop: '200px',
                    marginBottom: "auto",
                }} isOpen={openLoadPa}>
                    <div style={{backgroundColor: '#FFEFCD'}} align="center">
                        <i style={{color: "#FCBC3A", fontSize: '50px'}}
                           className="bx bx-calendar-check bx-tada"></i>
                        <div style={{
                            fontFamily: 'Cabin',
                            fontSize: '15px',
                        }}><b>Đổi bàn thành công</b>
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="none-display-customer">
                <Invalid/>
            </div>

        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    return {
        dataCloseTablePage: state.Notification.getCloseTable.dataCloseTable,
    };
};


export default withRouter(connect(mapStateToProps, {
    postChangeTableRequest,
    getCloseTableRequest,
    apiError
})(ChangeTable));