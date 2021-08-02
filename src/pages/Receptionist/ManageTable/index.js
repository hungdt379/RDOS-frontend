import React, {useEffect, useState, Component} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {connect, useDispatch} from "react-redux";

import "../../../assets/scss/custom/pages/receptionist/receptionist.scss";

import {Link} from "react-router-dom";
import Header from "../HeaderReception";
import {Button, Col, Container, Input, Row, Table} from "reactstrap/es";
import NotFound from "../../Authentication/Page401";
import * as actions from "../../../store/receptionist/actions";
import {withNamespaces} from "react-i18next";
import moment from "moment";
import chevonRight from "../../../assets/images/receptionist/chevron-down.png";
import vector from "../../../assets/images/receptionist/Vector.png";
import trash from "../../../assets/images/receptionist/trashre.png";
import searchImg from "../../../assets/images/customer/search.png";
import AddTable from "./AddTable";
import Footer from "../../../components/RdosCustomerLayout/Footer";
import {Modal} from "reactstrap";
import ReactPaginate from "react-paginate";

// Import menuDropdown

const ManageTable = (props) => {

    const [page, setPage] = useState(1)

    const [pageSize] = useState(10)

    const pageCount = Math.ceil(props?.allTableReceptionist?.total / pageSize);
    const changePage = ({ selected }) => {
        setPage(selected+1);
        props.dispatch(actions.getAllTableReRequest(selected+1));
    };

    console.log("pageCurrrent: "+ page)

    const [openAdd, setOpenAdd] = useState(false);

    const [openAddTable, setOpenAddTable] = useState(false);
    const [openDelTableSuccess, setOpenDelTableSuccess] = useState(false);
    const [openDelTableFail, setOpenDelTableFail] = useState(false);

    const handleSubmitAddTable = (data) => {
        props.dispatch(actions.addTableReRequest({data}));
        setOpenAdd(false);
        setOpenAddTable(true);
        setTimeout(() => {
            props.dispatch(actions.getAllTableReRequest(Math.ceil(props?.allTableReceptionist?.total / pageSize)));
            setOpenAddTable(false);
        }, 1000)
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
        setOpenAddTable(true);
        setTimeout(() => {
            props.dispatch(actions.getAllTableReRequest(page));
            setOpenAddTable(false);
        }, 1000)
    };

    const prevPage = () => {
        const pg = page === 1 ? 1 : page - 1
        setPage(pg)
        props.dispatch(actions.getAllTableReRequest(pg));
    }

    const nextPage = () => {
        const pg = page < Math.ceil(props?.allTableReceptionist?.total / pageSize) ? page + 1 : page
        setPage(pg)
        props.dispatch(actions.getAllTableReRequest(pg));
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

    const menu = {
        menuChoose: '3',
    }

    return (
        <div>
            {(role === 'r') ? (
                <div>
                    <div>
                        <Header item={menu}/>
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
                                    </div>
                                    <div className="col-4">
                                        <button style={{
                                            backgroundColor: '#FCBC3A',
                                            borderRadius: '10px',
                                            height: '35px',
                                            width: '100%',
                                            border: '1px solid #FCBC3A'
                                        }}
                                                onClick={() => {
                                                    setOpenAdd(true)
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
                                                        width: '100%',
                                                        border: '1px solid #FCBC3A'
                                                    }} onClick={() => {
                                                        props.dispatch(actions.generateTableReRequest(tabre._id))
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
                                                           if(tabre.is_active === false){
                                                               props.dispatch(actions.deleteTableReRequest(tabre._id))
                                                               setOpenDelTableSuccess(true)
                                                               setTimeout(() => {
                                                                   props.dispatch(actions.getAllTableReRequest(page));
                                                                   setOpenDelTableSuccess(false)
                                                               }, 1500)
                                                           }else {
                                                               setOpenDelTableFail(true)
                                                               setTimeout(() => {
                                                                   setOpenDelTableFail(false)
                                                               }, 1500)
                                                           }
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
                            <div className="mt-3">
                                <ReactPaginate
                                    previousLabel={
                                        <img src={chevonRight}
                                             className="plus-icon-button-re-left"/>
                                    }
                                    nextLabel={
                                        <img src={chevonRight}
                                             className="plus-icon-button-re-right"/>
                                    }
                                    pageCount={pageCount}
                                    onPageChange={changePage}
                                    containerClassName={"paginationBttns"}
                                    previousLinkClassName={"previousBttn"}
                                    nextLinkClassName={"nextBttn"}
                                    disabledClassName={"paginationDisabled"}
                                    activeClassName={"paginationActive"}
                                />
                            </div>
                        </div>
                    </div>
                    <AddTable
                        open={openAdd}
                        onClose={() => setOpenAdd(false)}
                        handleSubmitAddTable={handleSubmitAddTable}
                    />
                    <Modal size="md" isOpen={openEdit} toggle={() => setOpenEdit(false)} className="pt-5">
                        {props?.allTableReceptionist?.data?.map((tabre, index) => (tabre._id === table_id) ? (
                            <form align='center'
                                  style={{
                                      marginTop: '50px',
                                      marginBottom: '60px',
                                      borderRadius: '20px',
                                  }}
                                  >
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
                                                        title="Bạn chỉ được nhập số lớn hơn 0"
                                                        pattern="[0-9]+"
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
                                                        title="Bạn chỉ được nhập số lớn hơn 0"
                                                        pattern="[0-9]+"
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
                                                <Button
                                                    onClick={handleSubmitEditTable}
                                                    style={{width: '80%', backgroundColor: '#FCBC3A'}}>
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
                    </Modal>
                    <Modal align="center" style={{
                        width: '350px',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        height: '100px',
                        marginTop: '200px',
                        marginBottom: "auto",
                    }} isOpen={openAddTable}>
                        <div style={{backgroundColor: '#FFEFCD'}} align="center">
                            <i style={{color: "#FCBC3A", fontSize: '50px'}}
                               className="bx bx-calendar-check bx-tada"></i>
                            <div style={{
                                fontFamily: 'Cabin',
                                fontSize: '15px',
                            }}><b>Yêu cầu được thực hiện !</b>
                            </div>
                        </div>
                    </Modal>
                    <Modal align="center" style={{
                        width: '350px',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        height: '100px',
                        marginTop: '200px',
                        marginBottom: "auto",
                    }} isOpen={openDelTableSuccess}>
                        <div style={{backgroundColor: '#FFEFCD'}} align="center">
                            <i style={{color: "#FCBC3A", fontSize: '50px'}}
                               className="bx bx-calendar-check bx-tada"></i>
                            <div style={{
                                fontFamily: 'Cabin',
                                fontSize: '15px',
                            }}><b>Đã xóa bàn thành công !</b>
                            </div>
                        </div>
                    </Modal>
                    <Modal align="center" style={{
                        width: '350px',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        height: '100px',
                        marginTop: '200px',
                        marginBottom: "auto",
                    }} isOpen={openDelTableFail}>
                        <div style={{backgroundColor: '#FFEFCD'}} align="center">
                            <i style={{color: "#FCBC3A", fontSize: '50px'}}
                               className="bx bx-calendar-check bx-tada"></i>
                            <div style={{
                                fontFamily: 'Cabin',
                                fontSize: '15px',
                            }}><b>Bàn đang mở không được xóa !</b>
                            </div>
                        </div>
                    </Modal>
                    <Footer/>
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