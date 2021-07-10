import React, {useState, Component, useEffect} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/menu.scss";
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from "react-router-dom";
import NonAuthLayout from "../../../components/NonAuthLayout";
import PerfectScrollbar from "react-perfect-scrollbar";
import * as actions from "../../../store/customer/actions";
import Invalid from "../Invalid";
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";
import home from "../../../assets/images/customer/home.png";
import searchImg from "../../../assets/images/customer/search.png";
import desktop from "../../../assets/images/customer/desktop.png";
import food from "../../../assets/images/customer/food.png";
import bowl from "../../../assets/images/customer/bowl.png";
import coffee from "../../../assets/images/customer/coffee.png";
import shoppingCart from "../../../assets/images/customer/shopping-cart.png";
import mathPlus from "../../../assets/images/customer/math-plus.png";
import beers from "../../../assets/images/customer/Group.png";
import wine from "../../../assets/images/customer/wine.png";
import chicken from "../../../assets/images/customer/chicken.png";

const CustomerMenu = (props) => {

    const [search, setSearch] = useState('');
    const [menuOpen, setMenuOpen] = useState("block");
    const [bsearch, setBsearch] = useState("block");
    const [asearch, setAsearch] = useState("none");

    const openSearch = () => {
        setMenuOpen("none");
        setBsearch("none");
        setAsearch("block");
    };

    const closeSearch = () => {
        setMenuOpen("block");
        setBsearch("block");
        setAsearch("none");
    };

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
                        <div className="home-icon col-2">
                            <Link to="/customer-home">
                                <img src={home} className="icon-button"/>
                            </Link>
                        </div>
                        <div style={{display: menuOpen}} align="center" className="menu-search col-8">
                            <div className="mt-2 mb-2">
                                <span className="avatar-title bg-light span-table">
                                    <div className="div-table">Menu</div>
                                </span>
                            </div>
                        </div>
                        <div style={{display: bsearch}} align="right" className="home-icon col-2">
                            <a onClick={openSearch}>
                                <img src={searchImg} className="icon-button"/>
                            </a>
                        </div>
                        <div style={{display: asearch, marginLeft: '12%'}} align="right" className="col-10">
                            <div className="d-flex mt-2 mb-2">
                                <input className="search-bar" type="text" name="search" placeholder="Tìm kiếm..."
                                    // value={search}
                                       onChange={(e) => (
                                           setSearch(e.target.value),
                                               props.dispatch(actions.getAllSearchRequest(e.target.value))
                                       )}
                                />
                                <div style={{backgroundColor: '#FFEFCD',height:'34px'}} align="right" className="home-icon col-2">
                                    <a onClick={closeSearch}>
                                        <img style={{transform: 'matrix(-1,0,0,1,0,0)'}} src={searchImg} className="icon-button mt-2"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={(search === '') ? 'dis-cate' : 'none-dis-cate'}>
                        <div className="d-flex menu-bar pt-4 pb-2">
                            {props?.dataCategory?.map((category) => (
                                <a className="menu-type-a" href={"#" + category?.name}>
                                    <button className="menu-type">
                                        <div>{(category?.name === 'combo') ? (
                                                <div>
                                                    <div style={{marginRight: 'auto', marginLeft: 'auto'}}
                                                         className="avatar-sm profile-user-wid">
                                                        <div align="center"
                                                             className="cate-background-color avatar-title rounded-circle">
                                                            <img src={food} className="icon-button-menu"/>
                                                        </div>
                                                    </div>
                                                    <div className="square-text-button">Combo</div>
                                                    <div className="square-text-button">Nướng + Lẩu</div>
                                                </div>
                                            ) :
                                            (category?.name === 'drink') ? (
                                                    <div>
                                                        <div style={{marginRight: 'auto', marginLeft: 'auto'}}
                                                             className="avatar-sm profile-user-wid">
                                                            <div align="center"
                                                                 className="cate-background-color avatar-title rounded-circle">
                                                                <img src={coffee} className="icon-button-menu"/>
                                                            </div>
                                                        </div>
                                                        <div className="square-text-button">Đồ uống</div>
                                                    </div>
                                                ) :
                                                (category?.name === 'normal') ? (
                                                        <div>
                                                            <div style={{marginRight: 'auto', marginLeft: 'auto'}}
                                                                 className="avatar-sm profile-user-wid">
                                                                <div align="center"
                                                                     className="cate-background-color avatar-title rounded-circle">
                                                                    <img src={chicken} className="icon-button-menu"/>
                                                                </div>
                                                            </div>
                                                            <div className="square-text-button">Gọi món</div>
                                                        </div>
                                                    ) :
                                                    (category?.name === 'fast') ? (
                                                            <div>
                                                                <div style={{marginRight: 'auto', marginLeft: 'auto'}}
                                                                     className="avatar-sm profile-user-wid">
                                                                    <div align="center"
                                                                         className="cate-background-color avatar-title rounded-circle">
                                                                        <img src={bowl} className="icon-button-menu"/>
                                                                    </div>
                                                                </div>
                                                                <div className="square-text-button">Đồ ăn kèm</div>
                                                            </div>
                                                        ) :
                                                        (category?.name === 'alcohol') ? (
                                                                <div>
                                                                    <div style={{marginRight: 'auto', marginLeft: 'auto'}}
                                                                         className="avatar-sm profile-user-wid">
                                                                        <div align="center"
                                                                             className="cate-background-color avatar-title rounded-circle">
                                                                            <img src={wine} className="icon-button-menu"/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="square-text-button">Rượu</div>
                                                                </div>
                                                            ) :
                                                            (category?.name === 'beer') ? (
                                                                <div>
                                                                    <div style={{
                                                                        marginRight: 'auto',
                                                                        marginLeft: 'auto'
                                                                    }}
                                                                         className="avatar-sm profile-user-wid">
                                                                        <div align="center"
                                                                             className="cate-background-color avatar-title rounded-circle">
                                                                            <img src={beers} className="icon-button-menu"/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="square-text-button">Bia</div>
                                                                </div>
                                                            ) : null}</div>
                                    </button>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="cover-list">
                        <div className="side-list-menu">
                            <PerfectScrollbar className="list-menu">
                                <div className={(search !== '') ? 'dis-search' : 'none-dis-search'}>
                                    <div className="title-menu">Món bạn đang tìm là:</div>
                                    {props?.dataSearch?.map((se, id) => (
                                        <div className="item-menu d-flex">
                                            <div className="col-11 d-flex menu-item-bar">
                                                <div align="left" className="col-11">
                                                    <div className="item-name"><b>{se?.name}</b></div>
                                                    <div
                                                        className="item-cost">{(se?.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="add-button col-1">
                                                <Link to={`/customer-detail-combo/${se?._id}`}>
                                                    <div style={{
                                                        marginRight: 'auto',
                                                        marginLeft: 'auto'
                                                    }}
                                                         className="avatar-xs">
                                                        <div
                                                            className="plus-background-color avatar-title rounded-circle mt-2">
                                                            <img src={mathPlus} className="plus-icon-button"/>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={(search === '') ? 'dis-menu' : 'none-dis-menu'}>
                                    <div id="combo">
                                        <div className="title-menu"><b>Combo Nướng + Lẩu</b></div>
                                        {props?.dataMenu?.combo?.map((combo) => (
                                            <div className="item-menu d-flex">
                                                <div className="col-11 d-flex menu-item-bar">
                                                    <div align="left" className="col-11">
                                                        <div className="item-name"><b>{combo?.name}</b></div>
                                                        <div
                                                            className="item-cost">{(combo?.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="add-button col-1">
                                                    <Link to={`/customer-detail-combo/${combo?._id}`}>
                                                        <div style={{
                                                            marginRight: 'auto',
                                                            marginLeft: 'auto'
                                                        }}
                                                             className="avatar-xs">
                                                            <div
                                                                className="plus-background-color avatar-title rounded-circle mt-2">
                                                                <img src={mathPlus} className="plus-icon-button"/>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div id="drink">
                                        <div className="title-menu"><b>Đồ uống</b></div>
                                        {props?.dataMenu?.drink?.map((drink) => (
                                            <div className="item-menu d-flex">
                                                <div className="col-11 d-flex menu-item-bar">
                                                    <div align="left" className="col-11">
                                                        <div className="item-name"><b>{drink?.name}</b></div>
                                                        <div
                                                            className="item-cost">{(drink?.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="add-button col-1">
                                                    <Link to={`/customer-detail-combo/${drink?._id}`}>
                                                        <div style={{
                                                            marginRight: 'auto',
                                                            marginLeft: 'auto'
                                                        }}
                                                             className="avatar-xs">
                                                            <div
                                                                className="plus-background-color avatar-title rounded-circle mt-2">
                                                                <img src={mathPlus} className="plus-icon-button"/>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div id="normal">
                                        <div className="title-menu"><b>Gọi món</b></div>
                                        {props?.dataMenu?.normal?.map((normal) => (
                                            <div className="item-menu d-flex">
                                                <div className="col-11 d-flex menu-item-bar">
                                                    <div align="left" className="col-11">
                                                        <div className="item-name"><b>{normal?.name}</b></div>
                                                        <div
                                                            className="item-cost">{(normal?.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="add-button col-1">
                                                    <Link to={`/customer-detail-combo/${normal?._id}`}>
                                                        <div style={{
                                                            marginRight: 'auto',
                                                            marginLeft: 'auto'
                                                        }}
                                                             className="avatar-xs">
                                                            <div
                                                                className="plus-background-color avatar-title rounded-circle mt-2">
                                                                <img src={mathPlus} className="plus-icon-button"/>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div id="fast">
                                        <div className="title-menu"><b>Đồ ăn kèm</b></div>
                                        {props?.dataMenu?.fast?.map((fast) => (
                                            <div className="item-menu d-flex">
                                                <div className="col-11 d-flex menu-item-bar">
                                                    <div align="left" className="col-11">
                                                        <div className="item-name"><b>{fast?.name}</b></div>
                                                        <div
                                                            className="item-cost">{(fast?.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="add-button col-1">
                                                    <Link to={`/customer-detail-combo/${fast?._id}`}>
                                                        <div style={{
                                                            marginRight: 'auto',
                                                            marginLeft: 'auto'
                                                        }}
                                                             className="avatar-xs">
                                                            <div
                                                                className="plus-background-color avatar-title rounded-circle mt-2">
                                                                <img src={mathPlus} className="plus-icon-button"/>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div id="alcohol">
                                        <div className="title-menu"><b>Rượu</b></div>
                                        {props?.dataMenu?.alcohol?.map((alcohol) => (
                                            <div className="item-menu d-flex">
                                                <div className="col-11 d-flex menu-item-bar">
                                                    <div align="left" className="col-11">
                                                        <div className="item-name"><b>{alcohol?.name}</b></div>
                                                        <div
                                                            className="item-cost">{(alcohol?.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="add-button col-1">
                                                    <Link to={`/customer-detail-combo/${alcohol?._id}`}>
                                                        <div style={{
                                                            marginRight: 'auto',
                                                            marginLeft: 'auto'
                                                        }}
                                                             className="avatar-xs">
                                                            <div
                                                                className="plus-background-color avatar-title rounded-circle mt-2">
                                                                <img src={mathPlus} className="plus-icon-button"/>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div id="beer">
                                        <div className="title-menu"><b>Bia</b></div>
                                        {props?.dataMenu?.beer?.map((beer) => (
                                            <div className="item-menu d-flex">
                                                <div className="col-11 d-flex menu-item-bar">
                                                    <div align="left" className="col-11">
                                                        <div className="item-name"><b>{beer?.name}</b></div>
                                                        <div
                                                            className="item-cost">{(beer?.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="add-button col-1">
                                                    <Link to={`/customer-detail-combo/${beer?._id}`}>
                                                        <div style={{
                                                            marginRight: 'auto',
                                                            marginLeft: 'auto'
                                                        }}
                                                             className="avatar-xs">
                                                            <div
                                                                className="plus-background-color avatar-title rounded-circle mt-2">
                                                                <img src={mathPlus} className="plus-icon-button"/>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </PerfectScrollbar>
                        </div>
                    </div>
                </div>
                {(props?.dataCart?.data?.item_in_cart?.length !== 0) ? (
                    <div className="cart">
                        <Link to="/customer-cart">
                            <button className="cart-button">
                                <div className="text-cart-button"><img src={shoppingCart} className="icon-button mr-2"/>Xem
                                    danh sách món đã chọn
                                </div>
                            </button>
                        </Link>
                    </div>
                ) : (null)}
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