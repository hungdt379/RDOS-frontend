import React, {useState, Component, useEffect} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/menu.scss";
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import * as actions from "../../../store/customer/actions";
import Invalid from "../Invalid";
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";
import home from "../../../assets/images/customer/home.png";
import searchImg from "../../../assets/images/customer/search.png";
import food from "../../../assets/images/customer/food.png";
import bowl from "../../../assets/images/customer/bowl.png";
import coffee from "../../../assets/images/customer/coffee.png";
import shoppingCart from "../../../assets/images/customer/shopping-cart.png";
import mathPlus from "../../../assets/images/customer/math-plus.png";
import beers from "../../../assets/images/customer/beer.png";
import wine from "../../../assets/images/customer/wine.png";
import chicken from "../../../assets/images/customer/chicken.png";
import Footer from "../../../components/RdosCustomerLayout/Footer";
import {Modal} from "reactstrap";

const CustomerMenu = (props) => {

    const [search, setSearch] = useState('');
    const [menuOpen, setMenuOpen] = useState("block");
    const [bsearch, setBsearch] = useState("block");
    const [asearch, setAsearch] = useState("none");
    const [openLoad, setOpenLoad] = useState(false);

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
        // setOpenLoad(true);
        // setTimeout(() => {
        //     setOpenLoad(false);
        // }, 1000)
        if (props?.dataMenu?.combo !== undefined) {
            setOpenLoad(false)
        } else {
            setOpenLoad(true)
            setTimeout(() => {
                setOpenLoad(false);
            }, 1000)
        }
    }, []);

    console.log("combo : " + props?.dataMenu?.combo);
    console.log("menu : " + props?.dataMenu?.combo);

    return (
        <React.Fragment>
            <div className="display-customer">
                <div className="header-menu">
                    <div style={{height: '45px'}} className="d-flex">
                        <div className="home-icon col-2">
                            <Link to="/customer-home">
                                <img style={{width: '18px', height: '20px'}} src={home} className="icon-button"/>
                            </Link>
                        </div>
                        <div style={{display: menuOpen, marginTop: '5px'}} align="center" className="menu-search col-8">
                            <span style={{height: '35px'}} className="avatar-title bg-light span-table">
                                <div className="div-table">Menu</div>
                            </span>
                        </div>
                        <div style={{display: bsearch}} align="right" className="home-icon col-2">
                            <a onClick={openSearch}>
                                <img src={searchImg} className="icon-button"/>
                            </a>
                        </div>
                        <div style={{display: asearch, marginLeft: '12%', marginTop: '5px'}} align="right"
                             className="col-10">
                            <div className="d-flex">
                                <input className="search-bar" type="text" name="search" placeholder="Tìm kiếm..."
                                    // value={search}
                                       onChange={(e) => (
                                           setSearch(e.target.value),
                                               props.dispatch(actions.getAllSearchRequest(e.target.value, props.authCustomer.data.user.user_id))
                                       )}
                                />
                                <div style={{backgroundColor: '#FFEFCD', height: '35px'}} align="right"
                                     className="home-icon col-2">
                                    <a onClick={closeSearch}>
                                        <img style={{transform: 'matrix(-1,0,0,1,0,0)', marginTop: '5px'}}
                                             src={searchImg} className="icon-button"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={(search === '') ? 'dis-cate' : 'none-dis-cate'}>
                        <div className="d-flex menu-bar">
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
                                                    <div className="square-text-button">Combo Nướng</div>
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
                                                                            <img src={beers}
                                                                                 className="icon-button-menu"/>
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
                                        <div className="title-menu"><b>Combo Nướng</b></div>
                                        {props?.dataMenu?.combo?.map((combo) => (
                                            <div className="item-menu d-flex">
                                                <div style={{
                                                    backgroundColor: (combo?.is_sold_out === false && combo?.in_cart === false) ? '#EEEEEE' : (combo?.is_sold_out === false && combo?.in_cart === true) ? '#FFEEAA' : '#CFCFCF'
                                                }} className="col-11 d-flex menu-item-bar">
                                                    <div align="left" className="col-8">
                                                        <div className="item-name"><b>{combo?.name}</b></div>
                                                        <div
                                                            className="item-cost">{(combo?.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                                        </div>
                                                    </div>
                                                    <div align="right" className="col-3" style={{paddingTop: '18px'}}>
                                                        {(combo?.is_sold_out === false && combo?.in_cart === false) ? (
                                                            <div></div>
                                                        ) : (combo?.is_sold_out === false && combo?.in_cart === true) ? (
                                                            <div>
                                                                <b style={{
                                                                    fontSize: '18px',
                                                                    fontWeight: 'bold',
                                                                    fontStyle: 'normal',
                                                                    fontFamily: 'Cabin',
                                                                    paddingTop: '13px'
                                                                }}>{combo?.quantity}</b>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <b style={{
                                                                    fontWeight: 'bold',
                                                                    fontStyle: 'normal',
                                                                    fontFamily: 'Cabin',
                                                                }}>Hết hàng</b>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="add-button col-1">
                                                    {(combo?.is_sold_out === false) ? (
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
                                                    ) : (
                                                        <div>
                                                            <div style={{
                                                                marginRight: 'auto',
                                                                marginLeft: 'auto'
                                                            }}
                                                                 className="avatar-xs">
                                                                <div
                                                                    align='center'
                                                                    style={{
                                                                        backgroundColor:'#7A7A7A',
                                                                    }}
                                                                    className="plus-background-color avatar-title rounded-circle mt-2">
                                                                    <div style={{color: 'white'}}>+</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div id="drink">
                                        <div className="title-menu"><b>Đồ uống</b></div>
                                        {props?.dataMenu?.drink?.map((drink) => (
                                            <div className="item-menu d-flex">
                                                <div style={{
                                                    backgroundColor: (drink?.is_sold_out === false && drink?.in_cart === false) ? '#EEEEEE' : (drink?.is_sold_out === false && drink?.in_cart === true) ? '#FFEEAA' : '#CFCFCF'
                                                }} className="col-11 d-flex menu-item-bar">
                                                    <div align="left" className="col-8">
                                                        <div className="item-name"><b>{drink?.name}</b></div>
                                                        <div
                                                            className="item-cost">{(drink?.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                                        </div>
                                                    </div>
                                                    <div align="right" className="col-3" style={{paddingTop: '18px'}}>
                                                        {(drink?.is_sold_out === false && drink?.in_cart === false) ? (
                                                            <div></div>
                                                        ) : (drink?.is_sold_out === false && drink?.in_cart === true) ? (
                                                            <div>
                                                                <b style={{
                                                                    fontSize: '18px',
                                                                    fontWeight: 'bold',
                                                                    fontStyle: 'normal',
                                                                    fontFamily: 'Cabin',
                                                                    paddingTop: '13px'
                                                                }}>{drink?.quantity}</b>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <b style={{
                                                                    fontWeight: 'bold',
                                                                    fontStyle: 'normal',
                                                                    fontFamily: 'Cabin',
                                                                }}>Hết hàng</b>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="add-button col-1">
                                                    {(drink?.is_sold_out === false) ? (
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
                                                    ) : (
                                                        <div>
                                                            <div style={{
                                                                marginRight: 'auto',
                                                                marginLeft: 'auto'
                                                            }}
                                                                 className="avatar-xs">
                                                                <div
                                                                    align='center'
                                                                    style={{
                                                                        backgroundColor:'#7A7A7A',
                                                                    }}
                                                                    className="plus-background-color avatar-title rounded-circle mt-2">
                                                                    <div style={{color: 'white'}}>+</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div id="normal">
                                        <div className="title-menu"><b>Gọi món</b></div>
                                        {props?.dataMenu?.normal?.map((normal) => (
                                            <div className="item-menu d-flex">
                                                <div style={{
                                                    backgroundColor: (normal?.is_sold_out === false && normal?.in_cart === false) ? '#EEEEEE' : (normal?.is_sold_out === false && normal?.in_cart === true) ? '#FFEEAA' : '#CFCFCF'
                                                }} className="col-11 d-flex menu-item-bar">
                                                    <div align="left" className="col-8">
                                                        <div className="item-name"><b>{normal?.name}</b></div>
                                                        <div
                                                            className="item-cost">{(normal?.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                                        </div>
                                                    </div>
                                                    <div align="right" className="col-3" style={{paddingTop: '18px'}}>
                                                        {(normal?.is_sold_out === false && normal?.in_cart === false) ? (
                                                            <div></div>
                                                        ) : (normal?.is_sold_out === false && normal?.in_cart === true) ? (
                                                            <div>
                                                                <b style={{
                                                                    fontSize: '18px',
                                                                    fontWeight: 'bold',
                                                                    fontStyle: 'normal',
                                                                    fontFamily: 'Cabin',
                                                                    paddingTop: '13px'
                                                                }}>{normal?.quantity}</b>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <b style={{
                                                                    fontWeight: 'bold',
                                                                    fontStyle: 'normal',
                                                                    fontFamily: 'Cabin',
                                                                }}>Hết hàng</b>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="add-button col-1">
                                                    {(normal?.is_sold_out === false) ? (
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
                                                    ) : (
                                                        <div>
                                                            <div style={{
                                                                marginRight: 'auto',
                                                                marginLeft: 'auto'
                                                            }}
                                                                 className="avatar-xs">
                                                                <div
                                                                    align='center'
                                                                    style={{
                                                                        backgroundColor:'#7A7A7A',
                                                                    }}
                                                                    className="plus-background-color avatar-title rounded-circle mt-2">
                                                                    <div style={{color: 'white'}}>+</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div id="fast">
                                        <div className="title-menu"><b>Đồ ăn kèm</b></div>
                                        {props?.dataMenu?.fast?.map((fast) => (
                                            <div className="item-menu d-flex">
                                                <div style={{
                                                    backgroundColor: (fast?.is_sold_out === false && fast?.in_cart === false) ? '#EEEEEE' : (fast?.is_sold_out === false && fast?.in_cart === true) ? '#FFEEAA' : '#CFCFCF'
                                                }} className="col-11 d-flex menu-item-bar">
                                                    <div align="left" className="col-8">
                                                        <div className="item-name"><b>{fast?.name}</b></div>
                                                        <div
                                                            className="item-cost">{(fast?.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                                        </div>
                                                    </div>
                                                    <div align="right" className="col-3" style={{paddingTop: '18px'}}>
                                                        {(fast?.is_sold_out === false && fast?.in_cart === false) ? (
                                                            <div></div>
                                                        ) : (fast?.is_sold_out === false && fast?.in_cart === true) ? (
                                                            <div>
                                                                <b style={{
                                                                    fontSize: '18px',
                                                                    fontWeight: 'bold',
                                                                    fontStyle: 'normal',
                                                                    fontFamily: 'Cabin',
                                                                    paddingTop: '13px'
                                                                }}>{fast?.quantity}</b>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <b style={{
                                                                    fontWeight: 'bold',
                                                                    fontStyle: 'normal',
                                                                    fontFamily: 'Cabin',
                                                                }}>Hết hàng</b>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="add-button col-1">
                                                    {(fast?.is_sold_out === false) ? (
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
                                                    ) : (
                                                        <div>
                                                            <div style={{
                                                                marginRight: 'auto',
                                                                marginLeft: 'auto'
                                                            }}
                                                                 className="avatar-xs">
                                                                <div
                                                                    align='center'
                                                                    style={{
                                                                        backgroundColor:'#7A7A7A',
                                                                    }}
                                                                    className="plus-background-color avatar-title rounded-circle mt-2">
                                                                    <div style={{color: 'white'}}>+</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div id="alcohol">
                                        <div className="title-menu"><b>Rượu</b></div>
                                        {props?.dataMenu?.alcohol?.map((alcohol) => (
                                            <div className="item-menu d-flex">
                                                <div style={{
                                                    backgroundColor: (alcohol?.is_sold_out === false && alcohol?.in_cart === false) ? '#EEEEEE' : (alcohol?.is_sold_out === false && alcohol?.in_cart === true) ? '#FFEEAA' : '#CFCFCF'
                                                }} className="col-11 d-flex menu-item-bar">
                                                    <div align="left" className="col-8">
                                                        <div className="item-name"><b>{alcohol?.name}</b></div>
                                                        <div
                                                            className="item-cost">{(alcohol?.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                                        </div>
                                                    </div>
                                                    <div align="right" className="col-3" style={{paddingTop: '18px'}}>
                                                        {(alcohol?.is_sold_out === false && alcohol?.in_cart === false) ? (
                                                            <div></div>
                                                        ) : (alcohol?.is_sold_out === false && alcohol?.in_cart === true) ? (
                                                            <div>
                                                                <b style={{
                                                                    fontSize: '18px',
                                                                    fontWeight: 'bold',
                                                                    fontStyle: 'normal',
                                                                    fontFamily: 'Cabin',
                                                                    paddingTop: '13px'
                                                                }}>{alcohol?.quantity}</b>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <b style={{
                                                                    fontWeight: 'bold',
                                                                    fontStyle: 'normal',
                                                                    fontFamily: 'Cabin',
                                                                }}>Hết hàng</b>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="add-button col-1">
                                                    {(alcohol?.is_sold_out === false) ? (
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
                                                    ) : (
                                                        <div>
                                                            <div style={{
                                                                marginRight: 'auto',
                                                                marginLeft: 'auto'
                                                            }}
                                                                 className="avatar-xs">
                                                                <div
                                                                    align='center'
                                                                    style={{
                                                                        backgroundColor:'#7A7A7A',
                                                                    }}
                                                                    className="plus-background-color avatar-title rounded-circle mt-2">
                                                                    <div style={{color: 'white'}}>+</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div id="beer">
                                        <div className="title-menu"><b>Bia</b></div>
                                        {props?.dataMenu?.beer?.map((beer) => (
                                            <div className="item-menu d-flex">
                                                <div style={{
                                                    backgroundColor: (beer?.is_sold_out === false && beer?.in_cart === false) ? '#EEEEEE' : (beer?.is_sold_out === false && beer?.in_cart === true) ? '#FFEEAA' : '#CFCFCF'
                                                }} className="col-11 d-flex menu-item-bar">
                                                    <div align="left" className="col-8">
                                                        <div className="item-name"><b>{beer?.name}</b></div>
                                                        <div
                                                            className="item-cost">{(beer?.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} vnd
                                                        </div>
                                                    </div>
                                                    <div align="right" className="col-3" style={{paddingTop: '18px'}}>
                                                        {(beer?.is_sold_out === false && beer?.in_cart === false) ? (
                                                            <div></div>
                                                        ) : (beer?.is_sold_out === false && beer?.in_cart === true) ? (
                                                            <div>
                                                                <b style={{
                                                                    fontSize: '18px',
                                                                    fontWeight: 'bold',
                                                                    fontStyle: 'normal',
                                                                    fontFamily: 'Cabin',
                                                                    paddingTop: '13px'
                                                                }}>{beer?.quantity}</b>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <b style={{
                                                                    fontWeight: 'bold',
                                                                    fontStyle: 'normal',
                                                                    fontFamily: 'Cabin',
                                                                }}>Hết hàng</b>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="add-button col-1">
                                                    {(beer?.is_sold_out === false) ? (
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
                                                    ) : (
                                                        <div>
                                                            <div style={{
                                                                marginRight: 'auto',
                                                                marginLeft: 'auto'
                                                            }}
                                                                 className="avatar-xs">
                                                                <div
                                                                    align='center'
                                                                    style={{
                                                                        backgroundColor:'#7A7A7A',
                                                                    }}
                                                                    className="plus-background-color avatar-title rounded-circle mt-2">
                                                                    <div style={{color: 'white'}}>+</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
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
                                <div className="text-cart-button"><img style={{width: '22px', height: '19px'}}
                                                                       src={shoppingCart} className="icon-button mr-2"/>Xem
                                    danh sách món đã chọn
                                </div>
                            </button>
                        </Link>
                    </div>
                ) : (<Footer/>)}
                <Modal align="center" style={{
                    width: '100px',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    height: '100px',
                    marginTop: '200px',
                    marginBottom: "auto",
                }} isOpen={openLoad}>
                    <div style={{backgroundColor: '#FFEFCD'}} align="center">
                        <i style={{color: "#FCBC3A", fontSize: '50px'}}
                           className="bx bx-loader bx-spin"></i>
                        <div style={{
                            fontFamily: 'Cabin',
                            fontSize: '15px',
                        }}><b>Chờ chút ...</b>
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="none-display-customer">
                <Invalid/>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    const {authCustomer} = state.LoginCustomer;
    return {
        authCustomer,
        dataCategory: state.Customer.getAllCategory.allCategories,
        dataMenu: state.Customer.getAllMenu.allMenu,
        dataSearch: state.Customer.getAllSearch.allSearch,
        dataCart: state.Customer.getCart.dataCart,
        allQueueOrder: state.Customer.getCheckQueueOrder.allQueueOrder,
    };
};

export default withNamespaces()(connect(mapStateToProps)(CustomerMenu));