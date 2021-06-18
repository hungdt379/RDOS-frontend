import React from 'react';

import {Row, Col, CardBody, Card, Alert, Container} from "reactstrap";

// Redux
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter, Redirect} from 'react-router-dom';

// availity-reactstrap-validation
import {AvForm, AvField} from 'availity-reactstrap-validation';

// actions
import {customerLoginUser, apiErrorCus} from '../../store/auth/logincustomer/actions';

// import images
import profile from "../../assets/images/customer/logo-web.jpg";

const LoginCustomer = (props) => {

    // handleValidSubmit
    function handleValidSubmit(event, values) {
        props.customerLoginUser(values, props.history);
    }

    let query = new URLSearchParams(window.location.search);

    return (
        <React.Fragment>
            <div className="home-btn d-none d-sm-block">
                <Link to="/" className="text-dark"><i className="fas fa-home h2"></i></Link>
            </div>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <div className="bg-soft-primary">
                                    <Row style={{backgroundColor: 'lightcoral'}}>
                                        <Col className="col-7">
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary">Chào mừng bạn đến với Nhất Nướng !</h5>
                                            </div>
                                        </Col>
                                        <Col className="col-5 align-self-end">
                                            <img src={profile} alt="" className="img-fluid"/>
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody className="pt-0">
                                    <div>
                                        <div className="avatar-md profile-user-wid mb-4">
                                                <span className="avatar-title rounded-circle bg-light">
                                                    <b style={{color: 'lightcoral', fontSize: '18px'}}>{query.get("username")}</b>
                                                </span>
                                        </div>
                                    </div>
                                    <div className="p-2">

                                        <AvForm className="form-horizontal" onValidSubmit={(e, v) => {
                                            handleValidSubmit(e, v)
                                        }}>

                                            {/*{props.error && props.error ? <Alert color="danger">{props.error}</Alert> : null}*/}

                                            <div style={{display: 'none'}} className="form-group">
                                                <AvField name="username" label="Username" className="form-control"
                                                         placeholder="Enter username" type="text" required
                                                         value={query.get("username")}/>
                                            </div>

                                            <div style={{display: 'none'}} className="form-group">
                                                <AvField name="password" label="Password" type="password"
                                                         required placeholder="Enter Password"
                                                         value={query.get("password")}/>
                                            </div>

                                            <div className="mt-3">
                                                <button className="btn btn-primary btn-block waves-effect waves-light"
                                                        type="submit">Tiếp tục
                                                </button>
                                            </div>
                                        </AvForm>
                                    </div>
                                </CardBody>
                            </Card>
                            <div className="mt-5 text-center">
                                <p>© {new Date().getFullYear()} RDOS. Crafted with
                                    <i className="mdi mdi-heart text-danger"></i> by <b>SWP490_G49</b></p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}


const mapStatetoProps = state => {
    const {errorcus} = state.LoginCustomer;
    return {errorcus};
}

export default withRouter(connect(mapStatetoProps, {customerLoginUser, apiErrorCus})(LoginCustomer));