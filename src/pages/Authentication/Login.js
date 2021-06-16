import React from 'react';

import {Row, Col, CardBody, Card, Alert, Container} from "reactstrap";

// Redux
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter, Redirect} from 'react-router-dom';

// availity-reactstrap-validation
import {AvForm, AvField} from 'availity-reactstrap-validation';

// actions
import {loginUser, apiError, logoutUser} from '../../store/auth/login/actions';

// import images
import profile from "../../assets/images/customer/logo-web.jpg";



const Login = (props) => {

    // handleValidSubmit
    function  handleValidSubmit(event, values) {
        props.loginUser(values, props.history);
    }
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
                                                <h5 className="text-primary">Welcome Back !</h5>
                                                <p>Sign in to continue to RDOS.</p>
                                            </div>
                                        </Col>
                                        <Col className="col-5 align-self-end">
                                            <img src={profile} alt="" className="img-fluid"/>
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody className="pt-0">
                                    <div>
                                        <Link to="/">
                                            <div className="avatar-md profile-user-wid mb-4">
                                                <span className="avatar-title rounded-circle bg-light">
                                                    <b style={{color: 'lightcoral', fontSize: '18px'}}>RDOS</b>
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        <b style={{color: 'lightcoral', fontSize: '15px'}}>Restaurant Digital Order
                                            System</b>
                                    </div>
                                    <div className="p-2">

                                        <AvForm className="form-horizontal" onValidSubmit={(e,v) => { handleValidSubmit(e,v) }}>

                                            {/*{props.error && props.error ? <Alert color="danger">{props.error}</Alert> : null}*/}

                                            <div className="form-group">
                                                <AvField name="username" label="Username" className="form-control"
                                                         placeholder="Enter username" type="text" required/>
                                            </div>

                                            <div className="form-group">
                                                <AvField name="password" label="Password" type="password"
                                                         required placeholder="Enter Password"/>
                                            </div>

                                            <div className="mt-3">
                                                <button className="btn btn-primary btn-block waves-effect waves-light"
                                                        type="submit">Đăng nhập
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
    const { error } = state.Login;
    return { error };
}

export default withRouter(connect(mapStatetoProps, { loginUser,apiError })(Login));