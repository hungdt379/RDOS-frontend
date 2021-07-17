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
import chevonRight from "../../assets/images/receptionist/chevron-down.png";
import vector from "../../assets/images/receptionist/VectorStroke.png";

const NotificationDropdown = (props) => {
    // Declare a new state variable, which we'll call "menu"
    const [menu, setMenu] = useState(false);

    const [page, setPage] = useState(1)
    // const [pageChange, setPageChange] = useState(1)
    const [pageSize] = useState(10)
    const [totalCount, setTotalCount] = useState(0)
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
    console.log("notiFirebase: " + todoList);
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
                    <div className="logo logo-dark d-flex menu-type-a-re">
                        <div className="d-flex menu-type-re">
                            <div style={{marginTop: 'auto', marginBottom: 'auto'}}
                                 className="avatar-sm profile-user-wid mr-2">
                                <div align="center"
                                     className="avatar-title rounded-circle header-re-icon">
                                    <i style={{color: "#000000"}}
                                       className={(todoList !== 0) ? "bx bx-bell bx-tada" : "bx bx-bell"}></i>
                                    <span className="badge badge-danger badge-pill">
                                        {todoList}
                                    </span>
                                </div>
                            </div>
                            <div style={{marginTop: '-5px'}} className="square-text-button-re"><b>Thông báo</b></div>
                        </div>
                    </div>
                </DropdownToggle>

                <DropdownMenu
                    style={{
                        borderRadius: '10px'
                    }}
                    className="dropdown-menu dropdown-menu-lg dropdown-thanks-notification p-0"
                    right
                >
                    <div className="p-3">
                        <Row className="align-items-center">
                            <Col>
                                <h6 style={{
                                    fontSize: '12px',
                                    fontFamily: 'Cabin'
                                }} className="m-0"> Thông báo </h6>
                            </Col>
                            <div className="col-auto">
                                <a style={{
                                    fontFamily: 'Cabin',
                                    fontStyle: 'normal',
                                    fontWeight: 'normal',
                                    fontSize: '12px',
                                    lineHeight: '15px',
                                    textAlign: 'right',
                                    color: '#1E1C19',
                                }} onClick={maskAsRead} className="small d-flex">
                                    {" "}
                                    <div style={{textAlign:'right'}} className="inline-flex d-flex">
                                        <a
                                            style={{
                                                marginRight: 'auto',
                                                marginLeft: 'auto',
                                            }}
                                            className="mr-1 plus-icon-background-re-view-all">
                                            <div
                                                className="plus-icon-button-re-view-all avatar-title rounded-circle">
                                                <img src={vector}/>
                                            </div>
                                        </a>
                                    </div>
                                    <div style={{
                                        fontFamily: 'Cabin',
                                        fontStyle: 'normal',
                                        fontWeight: 'normal',
                                        fontSize: '15px',
                                        lineHeight: '18px',
                                        textAlign: 'right',
                                        color: '#1E1C19',
                                    }}>
                                        Đánh dấu xem hết
                                    </div>
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
                    </PerfectScrollbar>
                    <div align="right" className="p-2">
                        <div style={{width: '100%'}} className="d-flex">
                            <div className="col-6"></div>
                            <div style={{textAlign:'right'}} className="inline-flex mt-2 mt-0 d-flex col-6">
                                <a
                                    onClick={prevPage}
                                    style={{
                                        marginRight: 'auto',
                                        marginLeft: 'auto',
                                    }}
                                    className="avatar-xs mr-5">
                                    <div
                                        className="plus-background-color-re-noti avatar-title rounded-circle">
                                        <img src={chevonRight}
                                             className="plus-icon-button-re-left"/>
                                    </div>
                                </a>
                                <a
                                    onClick={nextPage}
                                    style={{
                                        marginRight: 'auto',
                                        marginLeft: 'auto',
                                    }}
                                    className="avatar-xs">
                                    <div
                                        className="plus-background-color-re-noti avatar-title rounded-circle">
                                        <img src={chevonRight}
                                             className="plus-icon-button-re-right"/>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </DropdownMenu>
            </Dropdown>
        </>
    )
        ;
};

const mapStateToProps = (state) => {
    return {
        // totalsOfNotification:
        // state.Notification.totalOfNotifications.totalNotifications,
        allNotificationReceptionist: state.Receptionist.getAllNotificationsReceptionist.allNotificationsReceptionist,
    };
};

export default withNamespaces()(connect(mapStateToProps)(NotificationDropdown));