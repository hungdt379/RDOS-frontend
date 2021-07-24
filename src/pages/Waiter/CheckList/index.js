import React, {useState, useEffect} from "react";
import { withRouter} from 'react-router-dom';
import PerfectScrollbar from "react-perfect-scrollbar";
import NotFound from "../../Authentication/Page401";
import Header from "../home/myHeader";
//scss
import "../../../assets/scss/custom/pages/waiter/header.scss";
import "../../../assets/scss/custom/pages/waiter/checkList.scss";
import {connect} from "react-redux";
import {
    getConfirmedOrderRequest,
    postDeleteDrinkRequest,
    postDeleteItemRequest,
    postUpdateDrinkRequest
} from "../../../store/post/actions";
import {apiError} from "../../../store/auth/login/actions";
import {getCheckListRequest} from "../../../store/notifications/actions";
import Invalid from "../../Customer/Invalid";
import Footer from "../../../components/RdosCustomerLayout/Footer";
function CheckList(props){

    const {dataCheckListPage} = props;

    async function getPrepare(){
        const value = {
            page: 1,
            pageSize: 5,
            status: "prepare"
        }
        props.getCheckListRequest(value);
    }
    const totalPage = dataCheckListPage.total;
    const pageCount = Math.ceil(totalPage/5);
    console.log(pageCount);

    async function deleteItem(item){
        await props.postDeleteDrinkRequest(item);
        getPrepare();
    }

    const getComplete = () => {
        const value = {
            page: 1,
            pageSize: 5,
            status: "completed"
        }
        props.getCheckListRequest(value);
    }

    const [role, setrole] = useState([]);

    function updateDrink(id) {
        const drinkID = {
            _id : id
        }
        props.postUpdateDrinkRequest(drinkID);
        getPrepare();
    }
    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setrole(obj.data.user.role);
        }
        getPrepare();
    }, []);

    return(
        <React.Fragment>
            <div className="display-customer">
                {(role === 'w')?(
                    <div className="container_checkList">
                        <Header/>
                        <div style={{textAlign: "center", justifycontent: "center"}}>
                            <h2>Check List</h2>
                            <div className="checkList-btn">
                                <span onClick={getPrepare}>Đang chuẩn bị</span>
                                <span onClick={getComplete}>Hoàn thành</span>
                            </div>
                            <PerfectScrollbar>
                                <div className="list-Item_checkList">
                                    {dataCheckListPage.data?.map((d, index) => (
                                            <div className="item-form-checkList" key={index}>
                                                <span>{d.item_name}</span>
                                                <span>{d.quantity}</span>
                                                <div className="save-button"  onClick={() =>{
                                                    updateDrink(d._id)
                                                }
                                                }>Xác Nhận</div>
                                                <span className="contain_button" onClick={() =>{
                                                    deleteItem(d)
                                                }
                                                }>X</span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </PerfectScrollbar>
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
        dataCheckListPage: state.Notification.getCheckList.dataCheckList,
    };
};


export default withRouter(connect(mapStateToProps, {postDeleteDrinkRequest,postUpdateDrinkRequest,getCheckListRequest,apiError})(CheckList));