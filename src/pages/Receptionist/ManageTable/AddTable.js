import React, {useEffect, useState, Component} from "react";

import "../../../assets/scss/custom/pages/receptionist/receptionist.scss";

import {Button, Col, Container, Input, Modal, Row, Table} from "reactstrap/es";
import {Controller, useForm} from "react-hook-form";

// Import menuDropdown

const AddTable = (props) => {

    const { open, onClose, handleSubmitAddTable } = props;
    const { handleSubmit, control } = useForm();

    const submit = (data) => {
        const { table_number, max_customer } = data;
        const postData = {
            table_number: table_number,
            max_customer: max_customer,
        };
        handleSubmitAddTable(postData);
    };

    return (
        <Modal size="md" isOpen={open} toggle={onClose} className="pt-5">
            <form align='center'
                  style={{marginTop: '50px', marginBottom: '60px', borderRadius: '20px'}}
                  onSubmit={handleSubmit(submit)}>
                <div><b style={{fontSize: '20px', fontFamily : 'Cabin'}}>Thêm bàn</b></div>
                <div className="modal-body">
                    <Row>
                        <Col lg="12">
                            <div className="form-group row">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-6 col-form-label"
                                    align="left"
                                    style={{paddingLeft:'5%', fontFamily:'Cabin', fontSize:'20px'}}
                                >
                                    Số bàn:
                                </label>
                                <div align='center' style={{marginTop: '0px', marginBottom: '10px'}} className="note-item">
                                    <Controller
                                        control={control}
                                        defaultValue={''}
                                        name="table_number"
                                        rules={{ required: true }}
                                        render={({ onChange, value, ref }) => (
                                            <Input
                                                style={{width: '90%', backgroundColor:'#FFEFCD'}}
                                                type="text"
                                                control={control}
                                                name="table_number"
                                                onChange={onChange}
                                                value={value}
                                                rows="5"
                                                maxLength="50"
                                                required
                                            />
                                        )}
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
                                    style={{paddingLeft:'5%', fontFamily:'Cabin', fontSize:'20px'}}
                                >
                                    Số khách tối đa:
                                </label>
                                <div align='center' style={{marginTop: '0px', marginBottom: '10px'}} className="note-item">
                                    <Controller
                                        control={control}
                                        defaultValue={''}
                                        name="max_customer"
                                        rules={{ required: true }}
                                        render={({ onChange, value, ref }) => (
                                            <Input
                                                style={{width: '90%', backgroundColor:'#FFEFCD'}}
                                                type="text"
                                                control={control}
                                                name="max_customer"
                                                onChange={onChange}
                                                value={value}
                                                rows="5"
                                                maxLength="50"
                                                required
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </Col>

                        <Col lg="12">
                            <div style={{width: '100%', paddingBottom: '20px'}}>
                                <Button style={{width: '80%', backgroundColor:'#FCBC3A'}}>
                                    <div style={{color: '#000000', fontWeight:'bold', fontFamily : 'Cabin'}}>Thêm bàn</div>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </form>
        </Modal>
    )
}

export default AddTable;