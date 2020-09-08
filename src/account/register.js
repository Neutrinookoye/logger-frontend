import React, {useEffect, useState} from 'react';

import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import accountController from '../server/controller';
import {alertService} from '../alert/alert'
import {Alert} from '../alert/alt'

function Register({ history }) {

    useEffect(() => {
        document.body.classList.add("login-page")
    })

    const initialValues = {
        firstName: '',
        lastName: '',
        otherName: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        gender: '',
        contactAddress: '',
        state: '',
        country: '',
        acceptTerms: false
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        mobile: Yup.string()
            .required('Mobile is required'),
        gender: Yup.string()
            .required('Gender is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        contactAddress: Yup.string()
            .required('Address is required'),
        state: Yup.string()
            .required('State is required'),
        country: Yup.string()
            .required('Country is required'),
        acceptTerms: Yup.bool()
            .oneOf([true], 'Accept Terms & Conditions is required')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        accountController.register(fields)
        .then(() => {
            alertService.success('Registration successful!', { keepAfterRouteChange: true });
            history.push('login');
        })
        .catch(error => {
            setSubmitting(false);
            alertService.error(error);
        });
    }

    return (
        <div className="reg-page">
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="form-header">
                            <p>Join us on Logger by creating an account</p>
                        </div>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                            {({ errors, touched, isSubmitting, setFieldValue, values }) => (
                                <Form>
                                    <div className="form-body">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <Field name="firstName" type="text" placeholder="First Name" className={'form-control mb-4' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="firstName" component="div" className="invalid-feedback mb-3" />
                                            </div>
                                            <div className="col-lg-6">
                                                <Field name="lastName" type="text" placeholder="Last Name" className={'form-control mb-4' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="lastName" component="div" className="invalid-feedback mb-3" />
                                            </div>
                                            <div className="col-lg-6">
                                                <Field name="otherName" type="text" placeholder="Other Name" className='form-control mb-4' />
                                            </div>
                                            <div className="col-lg-6">
                                                <Field name="email" type="text" placeholder="Email Address" className={'form-control mb-4' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                <ErrorMessage name="email" component="div" className="invalid-feedback mb-3" />
                                            </div>
                                            <div className="col-lg-6">
                                                <Field name="password" type="password" placeholder="Password" className={'form-control mb-4' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                <ErrorMessage name="password" component="div" className="invalid-feedback mb-3" />
                                            </div>
                                            <div className="col-lg-6">
                                                <Field name="confirmPassword" type="password" placeholder="Confirm Password" className={'form-control mb-4' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                                <ErrorMessage name="password" component="div" className="invalid-feedback mb-3" />
                                            </div>
                                            <div className="col-lg-6">
                                                <Field name="mobile" type="tel" placeholder="Mobile" className={'form-control mb-4' + (errors.mobile && touched.mobile ? ' is-invalid' : '')} />
                                                <ErrorMessage name="mobile" component="div" className="invalid-feedback mb-3" />
                                            </div>
                                            <div className="col-lg-6">
                                                <Field name="gender" as="select" className={'form-control custom-select mb-4' + (errors.gender && touched.gender ? ' is-invalid' : '')}>
                                                    <option value="" disabled>Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </Field>
                                                <ErrorMessage name="gender" component="div" className="invalid-feedback mb-3" />
                                            </div>
                                            <div className="col-lg-12">
                                                <Field name="contactAddress" type="text" placeholder="Contact Address" className={'form-control mb-4' + (errors.contactAddress && touched.contactAddress? ' is-invalid' : '')} />
                                                <ErrorMessage name="contactAddress" component="div" className="invalid-feedback mb-3" />
                                            </div>
                                            <div className="col-lg-6">
                                                <Field name="state" type="text" placeholder="State" className={'form-control mb-4' + (errors.state && touched.state ? ' is-invalid' : '')} />
                                                <ErrorMessage name="state" component="div" className="invalid-feedback mb-3" />
                                            </div>
                                            <div className="col-lg-6">
                                                <Field name="country" type="text" placeholder="Country" className={'form-control mb-4' + (errors.country && touched.country ? ' is-invalid' : '')} />
                                                <ErrorMessage name="country" component="div" className="invalid-feedback mb-3" />
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="ml-4">
                                                    <Field type="checkbox" name="acceptTerms" id="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                                                    <label htmlFor="acceptTerms" className="form-check-label">Accept Our Terms & Conditions</label>
                                                    <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 text-center mt-3">
                                                <button type="submit" disabled={isSubmitting} className="btn-submit">
                                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                    Register
                                                </button> 
                                                <Alert />
                                            </div>
                                        </div>                    
                                    </div> 
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export { Register }; 