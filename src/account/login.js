import React, {useEffect} from 'react';

import {Link} from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import accountController from '../server/controller';
import {alertService} from '../alert/alert'

import {Alert} from '../alert/alt'

function Login({ history, location }) {

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    useEffect(() => {
        document.body.classList.add("login-page")
    })

    function onSubmit({ email, password }, { setSubmitting }) {
        alertService.clear();
        accountController.login(email, password)
        .then(() => {
            const { from } = location.state || { from: { pathname: "/" } };
            history.push(from);
        })
        .catch(error => {
            console.log(error)
            setSubmitting(false);
            alertService.error(error);
        });
    }

    return (
        <div className="reg-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-11">
                        <div className="row">
                            <div className="col-md-6 message">
                                <h5>Welcome back to Logger!</h5>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi exercitationem cum adipisicing.
                                    sit amet consectetur adipisicing ipsum dolor, avalanche iribum. sit amet consectetur adipisicing ipsum dolor, avalanche iribum.
                                </p>
                            </div>
                            <div className="col-md-6 form-side">
                                <div className="form-header">
                                    <p>Sign into your account</p>
                                </div>
                                <div className="form-body">
                                    <Alert />
                                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                        {({ errors, touched, isSubmitting }) => (
                                            <Form>            
                                                <Field name="email" type="text" placeholder="Email Address" className={'form-control mb-4' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                <ErrorMessage name="email" component="div" className="invalid-feedback mb-3" />
                                                <Field name="password" type="password" placeholder="Password" className={'form-control mb-4' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                <ErrorMessage name="password" component="div" className="invalid-feedback mb-3" />
                                
                                                <button type="submit" disabled={isSubmitting} className="btn-submit">
                                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                    Login
                                                </button> 
                                            </Form>
                                        )}
                                    </Formik>
                                    <div className="other-links">
                                        <div className="float-left">
                                            <p>
                                                <Link to="register">Register</Link>
                                            </p>
                                        </div>
                                        <div className="float-right">
                                            <p>
                                                <Link to="forget-password">Forgot Password?</Link>
                                            </p>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Login }; 