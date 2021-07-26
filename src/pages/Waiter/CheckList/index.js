import React, {useState, useEffect} from "react";
import { withRouter} from 'react-router-dom';
import PerfectScrollbar from "react-perfect-scrollbar";
import NotFound from "../../Authentication/Page401";
import Header from "../home/myHeader";
import ReactPaginate from "react-paginate";
//scss
import "../../../assets/scss/custom/pages/waiter/header.scss";
import "../../../assets/scss/custom/pages/waiter/checkList.scss";
import {connect} from "react-redux";
import {
    postDeleteDrinkRequest,

    postUpdateDrinkRequest
} from "../../../store/post/actions";
import {apiError} from "../../../store/auth/login/actions";
import {
    getCheckListCompleteRequest,
    getCheckListPrepareRequest,
} from "../../../store/notifications/actions";
import Invalid from "../../Customer/Invalid";
import Footer from "../../../components/RdosCustomerLayout/Footer";
import chevonRight from "../../../assets/images/receptionist/chevron-down.png";
function CheckList(props){

    const {dataCheckListPreparePage} = props;

    const {dataCheckListCompletePage} = props;

    const [displayStatus, setStatus] = useState("prepare");

    const [page, setPage] = useState(1)

    const [pageSize] = useState(10)

    const [tableChoose, setTableChoose] = useState('1');

    const totalPreparePage = dataCheckListPreparePage.total;

    const preparePageCount = Math.ceil(totalPreparePage/pageSize);

    const totalCompletePage = dataCheckListCompletePage.total;

    const completePageCount = Math.ceil(totalCompletePage/pageSize);


    const changePreparePage = ({ selected }) => {
        setPage(selected+1);
       props.getCheckListPrepareRequest(selected+1);
    };

    const changeCompletePage = ({ selected }) => {
        setPage(selected+1);
        props.getCheckListCompleteRequest(selected +1);
    };


    async function deleteItem(item){
        await props.postDeleteDrinkRequest(item);

    }

    const [role, setrole] = useState([]);

    function updateDrink(id) {
        const drinkID = {
            _id : id
        }
        props.postUpdateDrinkRequest(drinkID);

    }
    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setrole(obj.data.user.role);
        }
        props.getCheckListPrepareRequest(1);
    }, []);

    return(
        <React.Fragment>
            <div className="display-customer">
                {(role === 'w')?(
                    <div className="container_checkList">
                        <Header/>
                        <div style={{textAlign: "center", justifycontent: "center",marginBottom: "30px"}}>
                            <div className="checkList-btn">
                                <label>
                                    <input
                                        type="radio"
                                        value={'1'}
                                        id={'1'}
                                        style={{opacity: '0'}}
                                        name="tableCheck"
                                        className="check-list"
                                        onChange={(e) => (
                                            setTableChoose(e.target.value),
                                            setStatus("prepare")

                                        )}
                                        checked={tableChoose === '1'}
                                    />
                                    <div className="item" onClick={() =>{
                                        props.getCheckListPrepareRequest(page);

                                    }}>Đang chuẩn bị</div>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value={'2'}
                                        id={'2'}
                                        style={{opacity: '0'}}
                                        name="tableCheck"
                                        className="check-list"
                                        onChange={(e) => (
                                            setTableChoose(e.target.value),
                                            setStatus("completed")
                                        )}
                                        checked={tableChoose === '2'}
                                    />
                                    <div className="item" onClick={() =>{
                                        props.getCheckListCompleteRequest(page);

                                    }}>Hoàn thành</div>
                                </label>

                            </div>
                            {(displayStatus === "prepare") ? (
                                <div>
                                    <PerfectScrollbar>
                                        <div className="list-Item_checkList">
                                            {dataCheckListPreparePage.data?.map((d, index) => (
                                                    <div className="item-form-checkList" key={index}>
                                                        <span>{d.item_name}</span>
                                                        <span>{d.quantity}</span>
                                                        <div className="save-button"  onClick={() =>{
                                                            updateDrink(d._id);
                                                            setTimeout(() => {
                                                                props.getCheckListPrepareRequest(page);
                                                            }, 500)

                                                        }
                                                        }>Xác Nhận</div>
                                                        <span className="contain_button" onClick={() =>{
                                                            deleteItem(d);
                                                            setTimeout(() => {
                                                                props.getCheckListPrepareRequest(page);
                                                            }, 500)
                                                        }
                                                        }>X</span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </PerfectScrollbar>
                                <ReactPaginate
                                    previousLabel={
                                        <img style={{width:"20px",height:"20px"}} src={chevonRight}
                                             className="plus-icon-button-re-left"/>
                                    }
                                    nextLabel={
                                        <img style={{width:"20px",height:"20px"}} src={chevonRight}
                                             className="plus-icon-button-re-right"/>
                                    }
                                    pageCount={preparePageCount}
                                    onPageChange={changePreparePage}
                                    containerClassName={"paginationHome"}
                                    previousLinkClassName={"previousBtnHome"}
                                    nextLinkClassName={"nextBtnHome"}
                                    disabledClassName={"paginationDisabledHome"}
                                    activeClassName={"paginationActiveHome"}
                                />
                                </div>
                            ) : (
                                <div>
                                    <PerfectScrollbar>
                                        <div className="list-Item_checkList">
                                            {dataCheckListCompletePage.data?.map((d, index) => (
                                                    <div className="item-form-checkList" key={index}>
                                                        <span>{d.item_name}</span>
                                                        <span>{d.quantity}</span>
                                                        <div className="save-button"  onClick={() =>{
                                                            updateDrink(d._id);
                                                            props.getCheckListCompleteRequest(page)
                                                        }
                                                        }>Xác Nhận</div>
                                                        <span className="contain_button" onClick={() =>{
                                                            deleteItem(d);
                                                            setTimeout(() => {
                                                                props.getCheckListCompleteRequest(page)
                                                            }, 500)

                                                        }
                                                        }>X</span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </PerfectScrollbar>
                                    <ReactPaginate
                                        previousLabel={
                                            <img style={{width:"20px",height:"20px"}} src={chevonRight}
                                                 className="plus-icon-button-re-left"/>
                                        }
                                        nextLabel={
                                            <img style={{width:"20px",height:"20px"}} src={chevonRight}
                                                 className="plus-icon-button-re-right"/>
                                        }
                                        pageCount={completePageCount}
                                        onPageChange={changeCompletePage}
                                        containerClassName={"paginationHome"}
                                        previousLinkClassName={"previousBtnHome"}
                                        nextLinkClassName={"nextBtnHome"}
                                        disabledClassName={"paginationDisabledHome"}
                                        activeClassName={"paginationActiveHome"}
                                    />
                                </div>
                            )}

                        </div>
                        </div>

                ):(<NotFound/>)}
                <Footer/>
            </div>
            <div className="none-display-customer">
                <Invalid/>
            </div>

        </React.Fragment>

    );
}

const mapStateToProps = (state) => {
    return {
        dataCheckListPreparePage: state.Notification.getCheckListPrepare.dataCheckListPrepare,
        dataCheckListCompletePage: state.Notification.getCheckListComplete.dataCheckListComplete,
    };
};


export default withRouter(connect(mapStateToProps, {postDeleteDrinkRequest,postUpdateDrinkRequest,getCheckListPrepareRequest,getCheckListCompleteRequest,apiError})(CheckList));