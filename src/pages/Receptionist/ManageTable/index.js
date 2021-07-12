import React, {useEffect, useState, Component} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {connect, useDispatch} from "react-redux";

import "../../../assets/scss/custom/pages/receptionist/receptionist.scss";

import {Link} from "react-router-dom";
import Header from "../HeaderReception";
import {Button, Col, Container, Input, Row, Table} from "reactstrap/es";
import Invalid from "../../Customer/Invalid";
import NotFound from "../../Authentication/Page401";
import * as actions from "../../../store/receptionist/actions";
import {withNamespaces} from "react-i18next";
import moment from "moment";
import chevonRight from "../../../assets/images/receptionist/chevron-down.png";
import vector from "../../../assets/images/receptionist/Vector.png";
import trash from "../../../assets/images/receptionist/trashre.png";
import searchImg from "../../../assets/images/customer/search.png";
import CallWaiter from "../../Customer/CallWaiter";
import AddTable from "./AddTable";
import Footer from "../../../components/RdosCustomerLayout/Footer";
import {postCallWaiterRequest} from "../../../store/customer/actions";
import EditTable from "./EditTable";
import {Controller} from "react-hook-form";

// Import menuDropdown

const ManageTable = (props) => {

    const [page, setPage] = useState(1)

    const [pageSize] = useState(10)

    const [openAdd, setOpenAdd] = useState(false);

    const handleSubmitAddTable = (data) => {
        props.dispatch(actions.addTableReRequest({data}));
        setOpenAdd(false);
        alert("Đã thêm bàn!");
        setTimeout(() => {
            props.dispatch(actions.getAllTableReRequest(page));
        }, 600)
    };

    const [openEdit, setOpenEdit] = useState(false);
    console.log("openEdit: " + openEdit);

    const [table_id, setTableId] = useState('');
    const [table_number, setTableNumber] = useState('');
    const [max_customer, setMaxCustomer] = useState('');
    console.log("table_id: " + table_id);
    console.log("table_number: " + table_number);
    console.log("max_customer: " + max_customer);

    const data = {table_id, table_number, max_customer};

    const handleSubmitEditTable = () => {
        props.dispatch(actions.editTableReRequest({data}));
        setOpenEdit(false);
        alert("Đã sửa thông tin bàn!");
        setTimeout(() => {
            props.dispatch(actions.getAllTableReRequest(page));
        }, 600)
    };

    const prevPage = () => {
        const pg = page === 1 ? 1 : page - 1
        setPage(pg)
        props.dispatch(actions.getAllTableReRequest(pg));
        setOpenEdit(false)
    }

    const nextPage = () => {
        const pg = page < Math.ceil(props?.allTableReceptionist?.total / pageSize) ? page + 1 : page
        setPage(pg)
        props.dispatch(actions.getAllTableReRequest(pg));
        setOpenEdit(false)
        // props.dispatch(actions.getAllNotificationReceptionist({ page, pageSize, receiver }));
    }

    const [role, setrole] = useState([]);
    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setrole(obj.data.user.role);
        }
        props.dispatch(actions.getAllTableReRequest(page));
    }, []);

    console.log('role :' + role);

    return (
        <div>
            {(role === 'r') ? (
                <div>
                    <div>
                        <Header/>
                        <div style={{
                            marginTop: '100px',
                            marginBottom: '60px',
                            paddingTop: '30px',
                            paddingBottom: '30px',
                            backgroundColor: '#ffffff',
                            width: '90%',
                            marginLeft: 'calc(100% - 95%)',
                            borderRadius: '10px',
                        }} align="center"
                             className="table-responsive">
                            <div className="d-flex">
                                <div className="col-5"></div>
                                <div className="col-2">
                                    <h1 style={{
                                        fontFamily: 'Cabin',
                                        fontStyle: 'normal',
                                        fontWeight: 'bold',
                                        fontSize: '23px',
                                        lineHeight: '25px',
                                        color: 'black',
                                    }}>Quản lý bàn</h1>
                                </div>
                                <div className="col-1"></div>
                                <div className="col-4 d-flex">
                                    <div className="col-8 d-flex">
                                        <input style={{
                                            height: '35px',
                                            border: '1px solid #000000',
                                            backgroundColor: '#ffffff',
                                            borderRight: '0px',
                                            width: '100%'
                                        }} className="search-bar" type="text" name="search" placeholder="Tìm kiếm..."
                                            // value={search}
                                            //    onChange={(e) => (
                                            //        setSearch(e.target.value),
                                            //            props.dispatch(actions.getAllSearchRequest(e.target.value))
                                            //    )}
                                        />
                                        <div style={{
                                            height: '35px',
                                            border: '1px solid #000000',
                                            borderLeft: '0px',
                                            borderRadius: '0px 20px 20px 0px',
                                            width: '100%'
                                        }} align="right" className="home-icon col-2">
                                            <a>
                                                <img style={{transform: 'matrix(-1,0,0,1,0,0)', marginTop: '5px'}}
                                                     src={searchImg} className="icon-button"/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <button style={{
                                            backgroundColor: '#FCBC3A',
                                            borderRadius: '10px',
                                            height: '35px',
                                            width: '100%'
                                        }}
                                                onClick={() => {
                                                    setOpenAdd(true)
                                                    setOpenEdit(false)
                                                }}
                                        >
                                            <b style={{
                                                fontFamily: 'Cabin',
                                                fontStyle: 'normal',
                                                fontWeight: '600',
                                                fontSize: '13px',
                                                lineHeight: '16px',
                                                color: '#000000',
                                            }}>Thêm bàn</b>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className={(openEdit === true) ? "col-8" : "col-12"}>
                                    <Table style={{width: '90%', marginTop: '10px'}} align="center"
                                           className="table mb-0">

                                        <thead align="center" style={{
                                            backgroundColor: '#ffffff',
                                            color: 'black',
                                            fontFamily: 'Cabin',
                                            fontStyle: 'normal',
                                            fontWeight: 'normal',
                                            fontSize: '15px',
                                            lineHeight: '16px',
                                        }}>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tên bàn</th>
                                            <th>Số lượng khách đang ngồi</th>
                                            <th>Số lượng khách tối đa</th>
                                            <th>Trạng thái</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody align="center" style={{backgroundColor: '#ffffff'}}>
                                        {props?.allTableReceptionist?.data?.map((tabre, index) => (
                                            <tr style={{
                                                backgroundColor: '#F8F8FB',
                                                border: '5px solid #ffffff',
                                                fontFamily: 'Cabin',
                                                fontStyle: 'normal',
                                                fontWeight: '600',
                                                fontSize: '14px',
                                                lineHeight: '17px',
                                            }}>
                                                <th>
                                                    <div className="table-th-manage-table">
                                                        <div>{index + 1 + (page - 1) * 10}</div>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="table-th-manage-table">
                                                        <div>{tabre.full_name}</div>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="table-th-manage-table">
                                                        <div>{tabre.number_of_customer}</div>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="table-th-manage-table">
                                                        <div>{tabre.max_customer}</div>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="table-th-manage-table">
                                                        {(tabre.is_active === true) ? (
                                                                <div style={{color: "green"}}>Mở</div>)
                                                            : <div style={{color: "red"}}>Đóng</div>}
                                                    </div>
                                                </th>
                                                <th align="right">
                                                    <div align="right" className="d-flex">
                                                        <div style={{marginTop: 'auto', marginBottom: 'auto'}}
                                                             className="avatar-xs profile-user-wid mr-3">
                                                            <a align="center"
                                                               className="avatar-title rounded-circle"
                                                               style={{
                                                                   backgroundColor: '#FFEFCD',
                                                                   border: '1px solid #FCBC3A'
                                                               }}
                                                               onClick={(e) => {
                                                                   // window.location.pathname = '/receptionist-manage/' + tabre._id
                                                                   setOpenEdit(true)
                                                                   setTableId(tabre._id)
                                                               }}
                                                            >
                                                                <img src={vector}
                                                                     className="icon-button-menu-manage-table"/>
                                                            </a>
                                                        </div>
                                                        <div style={{
                                                            marginTop: 'auto',
                                                            marginBottom: 'auto',
                                                            width: '50%'
                                                        }}>
                                                            <button style={{
                                                                backgroundColor: '#FCBC3A',
                                                                borderRadius: '30px',
                                                                height: '35px',
                                                                width: '100%'
                                                            }} onClick={() => {
                                                                props.dispatch(actions.generateTableReRequest(tabre._id))
                                                                setOpenEdit(false)
                                                            }}
                                                            >
                                                                <b style={{
                                                                    fontFamily: 'Cabin',
                                                                    fontStyle: 'normal',
                                                                    fontWeight: '600',
                                                                    fontSize: '13px',
                                                                    lineHeight: '16px',
                                                                    color: '#000000',
                                                                }}>Tạo mã QR mới</b>
                                                            </button>
                                                        </div>
                                                        <div style={{marginTop: 'auto', marginBottom: 'auto'}}
                                                             className="avatar-xs profile-user-wid ml-3">
                                                            <a align="center"
                                                               className="avatar-title rounded-circle"
                                                               style={{
                                                                   backgroundColor: '#FFD1D1',
                                                                   border: '1px solid red'
                                                               }}
                                                               onClick={() => {
                                                                   props.dispatch(actions.deleteTableReRequest(tabre._id))
                                                                   setOpenEdit(false)
                                                                   setTimeout(() => {
                                                                       props.dispatch(actions.getAllTableReRequest(page));
                                                                   }, 600)
                                                               }}
                                                            >
                                                                <img src={trash}
                                                                     className="icon-button-menu-manage-table"/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </th>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </div>
                                {(openEdit === true)?(
                                    <div className="col-4">
                                        {props?.allTableReceptionist?.data?.map((tabre, index) => (tabre._id === table_id) ? (
                                            <form align='center'
                                                  style={{
                                                      marginTop: '50px',
                                                      marginBottom: '60px',
                                                      borderRadius: '20px',
                                                      border: '1px solid #FCBC3A'
                                                  }}
                                                  onSubmit={handleSubmitEditTable}>
                                                <div><b style={{fontSize: '20px', fontFamily: 'Cabin'}}>Sửa thông tin bàn</b></div>
                                                <div className="modal-body">
                                                    <Row>
                                                        <Col lg="12">
                                                            <div className="form-group row d-flex">
                                                                <label
                                                                    htmlFor="example-text-input"
                                                                    className="col-md-6 col-form-label"
                                                                    align="left"
                                                                    style={{
                                                                        paddingLeft: '5%',
                                                                        fontFamily: 'Cabin',
                                                                        fontSize: '20px'
                                                                    }}
                                                                >
                                                                    Bàn số: {tabre.full_name}
                                                                </label>
                                                                <label
                                                                    htmlFor="example-text-input"
                                                                    className="col-md-6 col-form-label"
                                                                    align="left"
                                                                    style={{
                                                                        paddingLeft: '5%',
                                                                        fontFamily: 'Cabin',
                                                                        fontSize: '20px'
                                                                    }}
                                                                >
                                                                    Số khách tối đa: {tabre.max_customer}
                                                                </label>
                                                            </div>
                                                        </Col>

                                                        <Col lg="12">
                                                            <div className="form-group row">
                                                                <label
                                                                    htmlFor="example-text-input"
                                                                    className="col-md-6 col-form-label"
                                                                    align="left"
                                                                    style={{
                                                                        paddingLeft: '5%',
                                                                        fontFamily: 'Cabin',
                                                                        fontSize: '20px'
                                                                    }}
                                                                >
                                                                    Số bàn:
                                                                </label>
                                                                <div align='center'
                                                                     style={{marginTop: '0px', marginBottom: '10px'}}
                                                                     className="note-item">
                                                                    <Input
                                                                        style={{width: '90%', backgroundColor: '#FFEFCD'}}
                                                                        type="text"
                                                                        name="table_number"
                                                                        onChange={(e) => (
                                                                            setTableNumber(e.target.value)
                                                                        )}
                                                                        rows="5"
                                                                        maxLength="50"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                        </Col>

                                                        <Col lg="12">
                                                            <div className="form-group row">
                                                                <label
                                                                    htmlFor="example-text-input"
                                                                    className="col-md-6 col-form-label"
                                                                    align="left"
                                                                    style={{
                                                                        paddingLeft: '5%',
                                                                        fontFamily: 'Cabin',
                                                                        fontSize: '20px'
                                                                    }}
                                                                >
                                                                    Số khách tối đa:
                                                                </label>
                                                                <div align='center'
                                                                     style={{marginTop: '0px', marginBottom: '10px'}}
                                                                     className="note-item">
                                                                    <Input
                                                                        style={{width: '90%', backgroundColor: '#FFEFCD'}}
                                                                        type="text"
                                                                        name="max_customer"
                                                                        onChange={(e) => (
                                                                            setMaxCustomer(e.target.value)
                                                                        )}
                                                                        rows="5"
                                                                        maxLength="50"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                        </Col>

                                                        <Col lg="12">
                                                            <div style={{width: '100%', paddingBottom: '20px'}}>
                                                                <Button style={{width: '80%', backgroundColor: '#FCBC3A'}}>
                                                                    <div style={{
                                                                        color: '#000000',
                                                                        fontWeight: 'bold',
                                                                        fontFamily: 'Cabin'
                                                                    }}>Sửa thông tin bàn
                                                                    </div>
                                                                </Button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </form>) : (null)
                                        )}
                                    </div>
                                ):(<div></div>)}
                            </div>
                            <div className="inline-flex mt-2 mt-0 d-flex" style={{width: '5%'}}>
                                <a
                                    onClick={prevPage}
                                    style={{
                                        marginRight: 'auto',
                                        marginLeft: 'auto',
                                        textAlign: 'right'
                                    }}
                                    className="avatar-xs">
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
                                        textAlign: 'left'
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
                    <AddTable
                        open={openAdd}
                        onClose={() => setOpenAdd(false)}
                        handleSubmitAddTable={handleSubmitAddTable}
                    />
                </div>
            ) : (<NotFound/>)}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        // totalsOfNotification:
        // state.Notification.totalOfNotifications.totalNotifications,
        allTableReceptionist: state.Receptionist.getAllTableReceptionist.allTableReceptionist,
        addTableReceptionist: state.Receptionist.postAddTableReceptionist.addTableReceptionist,
        deleteTableReceptionist: state.Receptionist.postDeleteTableReceptionist.deleteTableReceptionist,
        generateTableReceptionist: state.Receptionist.getGenerateTableReceptionist.generateTableReceptionist,
        editTableReceptionist: state.Receptionist.postEditTableReceptionist.editTableReceptionist,
    };
};

export default withNamespaces()(connect(mapStateToProps)(ManageTable));