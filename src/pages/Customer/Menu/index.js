import React, {useState, Component, useEffect} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/menu.scss";
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from "react-router-dom";
import NonAuthLayout from "../../../components/NonAuthLayout";
import * as actions from "../../../store/customer/actions";
import Invalid from "../Invalid";
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";

const CustomerMenu = (props) => {

    const [search, setSearch] = useState('');

    // const onchange = (e) => {
    //     const value = e.target.value;
    //     setSearch({
    //         ...search,
    //         [e.target.value]: value,
    //     });
    //     props.dispatch(actions.getAllSearchRequest(value));
    // };

    useEffect(() => {
        props.dispatch(actions.getAllCategoryRequest());
        props.dispatch(actions.getAllMenuRequest());
        props.dispatch(actions.getCartRequest());
    }, []);

    console.log("combo : " + props?.dataMenu?.combo);

    return (
        <React.Fragment>
            <div className="display-customer">
                <div className="header-menu">
                    <div className="d-flex">
                        <div className="home-icon col-2"><Link to="/customer-home">
                            <div>(icon)</div>
                            <div>home</div>
                        </Link></div>
                        <div align="center" className="menu-search col-8">
                            <input className="search-bar" type="text" name="search" placeholder="Tìm kiếm..."
                                // value={search}
                                   onChange={(e) => (
                                       setSearch(e.target.value),
                                           props.dispatch(actions.getAllSearchRequest(e.target.value))
                                   )}
                            />
                        </div>
                        <div className="table-header col-2">RDOS</div>
                    </div>
                    <div className={(search === '') ? 'dis-menu' : 'none-dis-menu'}>
                        <div className="d-flex menu-bar">
                            {props?.dataCategory?.map((category) => (
                                <a className="menu-type-a" href={"#" + category?.name}>
                                    <button className="menu-type">
                                        <div>{(category?.name === 'combo') ? ('Combo Nướng + Lẩu') :
                                            (category?.name === 'drink') ? ('Đồ uống') :
                                                (category?.name === 'fast') ? ('Đồ ăn kèm') : null}</div>
                                    </button>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={(search !== '') ? 'dis-menu' : 'none-dis-menu'}>
                    <div className="title-menu">Món bạn đang tìm là:</div>
                    {props?.dataSearch?.map((se,id) => (
                        <div className="item-menu d-flex">
                            <div align="left" className="col-10">
                                <div className="item-name"><b>{se?.name}</b></div>
                                <div
                                    className="item-cost">{(se?.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                </div>
                            </div>
                            <div align="right" className="add-button col-2">
                                <Link to={`/customer-detail-combo/${se?._id}`}>
                                    <button className="add-btn">
                                        <div><i style={{color: "#000000"}} className="bx bx-plus-medical bx-tada"></i>
                                        </div>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={(search === '') ? 'dis-menu' : 'none-dis-menu'}>
                    <div id="combo">
                        <div className="title-menu"><b>Combo nướng + lẩu</b></div>
                        {props?.dataMenu?.combo?.map((combo, id) => (
                            <div className="item-menu d-flex">
                                <div align="left" className="col-10">
                                    <div className="item-name"><b>{combo?.name}</b></div>
                                    <div
                                        className="item-cost">{(combo?.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                    </div>
                                </div>
                                <div align="right" className="add-button col-2">
                                    <Link to={`/customer-detail-combo/${combo?._id}`}>
                                        <button className="add-btn">
                                            <div><i style={{color: "#000000"}}
                                                    className="bx bx-plus-medical bx-tada"></i></div>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div id="drink">
                        <div className="title-menu"><b>Đồ uống</b></div>
                        {props?.dataMenu?.drink?.map((drink) => (
                            <div className="item-menu d-flex">
                                <div align="left" className="col-10">
                                    <div className="item-name"><b>{drink?.name}</b></div>
                                    <div
                                        className="item-cost">{(drink?.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                    </div>
                                </div>
                                <div align="right" className="add-button col-2">
                                    <Link to={`/customer-detail-combo/${drink?._id}`}>
                                        <button className="add-btn">
                                            <div><i style={{color: "#000000"}}
                                                    className="bx bx-plus-medical bx-tada"></i></div>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div id="fast">
                        <div className="title-menu"><b>Đồ ăn kèm</b></div>
                        {props?.dataMenu?.fast?.map((fast) => (
                            <div className="item-menu d-flex">
                                <div align="left" className="col-10">
                                    <div className="item-name"><b>{fast?.name}</b></div>
                                    <div
                                        className="item-cost">{(fast?.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                    </div>
                                </div>
                                <div align="right" className="add-button col-2">
                                    <Link to={`/customer-detail-combo/${fast?._id}`}>
                                        <button className="add-btn">
                                            <div><i style={{color: "#000000"}}
                                                    className="bx bx-plus-medical bx-tada"></i></div>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    {(props?.dataCart?.data?.item_in_cart?.length !== 0) ? (
                        <div className="cart">
                            <Link to="/customer-cart">
                                <button className="cart-button">
                                    <div>Xem danh sách món đã chọn</div>
                                </button>
                            </Link>
                        </div>
                    ):(null)}
                </div>
            </div>
            <div className="none-display-customer">
                <Invalid/>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        dataCategory: state.Customer.getAllCategory.allCategories,
        dataMenu: state.Customer.getAllMenu.allMenu,
        dataSearch: state.Customer.getAllSearch.allSearch,
        dataCart: state.Customer.getCart.dataCart,
    };
};

export default withNamespaces()(connect(mapStateToProps)(CustomerMenu));