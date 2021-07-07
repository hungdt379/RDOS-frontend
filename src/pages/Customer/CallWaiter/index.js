import React, {useMemo, useState} from "react";

//Import scss
import "../../../assets/scss/custom/pages/customer/detail.scss";
import {Link} from "react-router-dom";

import imageItem from "../../../assets/images/customer/logo-web.jpg";
import {
    Modal,
    Input,
    Button
} from "reactstrap/es";
import * as actions from "../../../store/customer/actions";
import {useSelector} from "react-redux";
import {useForm, Controller} from "react-hook-form";

function CallWaiter(props) {

    const { open, onClose, handleSubmitCallWaiter } = props;
    const { handleSubmit, control } = useForm();

    const submit = (data) => {
        const { content } = data;
        const postData = {
            content: content,
        };
        handleSubmitCallWaiter(postData);
    };

    return (
        <Modal size="lg" isOpen={open} toggle={onClose} className="pt-5">
            <form align='center'
                  style={{marginTop: '50px', marginBottom: '60px', borderRadius: '20px'}}
                  onSubmit={handleSubmit(submit)}>
                <div><b style={{fontSize: '20px'}}>Gọi phục vụ</b></div>
                <div align='center' style={{paddingTop: '20px', marginBottom: '10px'}} className="note-item">
                    <Controller
                        control={control}
                        defaultValue={''}
                        name="content"
                        rules={{ required: true }}
                        render={({ onChange, value, ref }) => (
                            <Input
                                style={{width: '90%'}}
                                type="text"
                                control={control}
                                name="content"
                                onChange={onChange}
                                value={value}
                                rows="5"
                                maxLength="255"
                                required
                            />
                        )}
                    />
                </div>
                <div style={{width: '100%', paddingBottom: '20px'}}>
                    <Button style={{width: '80%'}}>
                        <div>Gọi phục vụ</div>
                    </Button>
                </div>
            </form>
        </Modal>
    )
        ;
}

export default CallWaiter;