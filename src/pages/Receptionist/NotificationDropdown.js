import React, {useState, useEffect} from "react";
import {Link, Route, Switch} from "react-router-dom";
import {Dropdown, DropdownToggle, DropdownMenu, Row, Col} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
//Import scss
import "../../assets/scss/custom/pages/receptionist/receptionist.scss";
import {connect} from "react-redux";
import * as actions from "../../store/receptionist/actions";
import firebase from '../../helpers/firebase';

import NotificationCard from "./NotificationCard";

//i18n
import {withNamespaces} from "react-i18next";

const NotificationDropdown = (props) => {
    // Declare a new state variable, which we'll call "menu"
    const [menu, setMenu] = useState(false);

    const [page, setPage] = useState(1)
    // const [pageChange, setPageChange] = useState(1)
    const [pageSize] = useState(10)
    const [totalCount,  setTotalCount] = useState(0)
    const prevPage = () => {
        const pg = page === 1 ? 1 : page - 1
        setPage(pg)
        props.dispatch(actions.getAllNotificationReceptionist(pg));
    }

    const nextPage = () => {
        const pg = page < Math.ceil(props?.allNotificationReceptionist?.total / pageSize) ? page + 1 : page
        setPage(pg)
        props.dispatch(actions.getAllNotificationReceptionist(pg));
        // props.dispatch(actions.getAllNotificationReceptionist({ page, pageSize, receiver }));
    }

    const receiver = "receptionist"

    const handleChangeMenu = (value) => {
        setMenu(value);
    };

    const [todoList, setTodoList] = useState(0);

    useEffect(() => {
        const todoRef = firebase.database().ref('receptionist');
        todoRef.on('value', (snapshot) => {
            setTodoList(snapshot.numChildren());
        });
    }, []);
    console.log("notiFirebase: "+ todoList);
    // console.log("page: "+ (props?.allNotificationReceptionist?.total % pageSize) )

    const maskAsRead = () => {
        props.dispatch(actions.maskAsReadRequest());
        props.dispatch(actions.getAllNotificationReceptionist(page));
    }

    return (
        <>
            <Dropdown
                isOpen={menu}
                toggle={() => {
                    setMenu(!menu)
                    props.dispatch(actions.getAllNotificationReceptionist(page));
                    setTodoList(0);
                    setTotalCount(props?.allNotificationReceptionist?.total);
                }}
                className="dropdown d-inline-block"
                tag="li"
            >
                <DropdownToggle
                    className="btn header-item noti-icon waves-effect"
                    tag="button"
                    id="page-header-notifications-dropdown"
                >
                    <i style={{color: "#000000"}} className={(todoList !== 0) ? "bx bx-bell bx-tada" : "bx bx-bell"}></i>
                    <span className="badge badge-danger badge-pill">
                        {todoList}
          </span>
                </DropdownToggle>

                <DropdownMenu
                    className="dropdown-menu dropdown-menu-lg dropdown-thanks-notification p-0"
                    right
                >
                    <div className="p-3">
                        <Row className="align-items-center">
                            <Col>
                                <h6 className="m-0"> Thông báo </h6>
                            </Col>
                            <div className="col-auto">
                                <a onClick={maskAsRead} className="small">
                                    {" "}
                                    Đánh dấu xem hết
                                </a>
                            </div>
                        </Row>
                    </div>
                    <PerfectScrollbar style={{height: "100%"}}>
                        {props?.allNotificationReceptionist?.data?.map((notification) => (
                            <NotificationCard
                                key={notification._id}
                                data={notification}
                                userId={notification.user_id}
                                menu={handleChangeMenu}
                            />
                        ))}
                        <div align="center" className="p-2 border-top">
                            <div style={{width:'100%'}} className="inline-flex mt-2 mt-0">
                                <button
                                    style={{width:'50%'}}
                                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                                    onClick={prevPage}
                                >
                                    Trước
                                </button>
                                {/*<input style={{width:'30%'}} className="search-bar" type="text" name="search" disabled*/}
                                {/*       //value={page}*/}
                                {/*       onChange={(e) => (*/}
                                {/*           setPage(e.target.value),*/}
                                {/*               props.dispatch(actions.getAllNotificationReceptionist( e.target.value))*/}
                                {/*       )}*/}
                                {/*/>*/}
                                <button
                                    style={{width:'50%'}}
                                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                                    onClick={nextPage}
                                >
                                    Sau
                                </button>
                            </div>
                        </div>
                    </PerfectScrollbar>
                </DropdownMenu>
            </Dropdown>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        // totalsOfNotification:
        // state.Notification.totalOfNotifications.totalNotifications,
        allNotificationReceptionist: state.Receptionist.getAllNotificationsReceptionist.allNotificationsReceptionist,
    };
};

export default withNamespaces()(connect(mapStateToProps)(NotificationDropdown));