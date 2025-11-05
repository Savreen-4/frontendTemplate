import React, { useState, useEffect } from 'react';
import { useFormik, FormikProvider, Form, Field } from 'formik';
import * as Yup from 'yup';
import FieldInputText from '../../modules/common/FieldInputText';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ConfirmResetAction, SendAdminPasswordAction } from '../../redux/features/auth/authActions';
import BackButton from '../../modules/common/BackButton';
import { useIntl } from 'react-intl';

const ChangePasswordForm = () => {
    const dispatch: any = useDispatch();
    const { otpStage } = useSelector((state: any) => state.auth)
    const [passwordData, setPasswordData] = useState<any>(null);
    const [resendTimer, setResendTimer] = useState(0);
    const navigate = useNavigate();
    const { formatMessage } = useIntl();

    useEffect(() => {
        let timer: any;
        if (resendTimer > 0) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendTimer]);

    const passwordValidationSchema = Yup.object().shape({
        password: Yup.string()
            .required(formatMessage({ id: 'PASSWORD_REQUIRED' }))
            .min(6, formatMessage({ id: 'PASSWORD_MIN_LENGTH' }, { length: 6 }))
            .matches(/^[^\s]+$/, formatMessage({ id: 'PASSWORD_NO_SPACES' }))
            .matches(/[A-Z]/, formatMessage({ id: 'PASSWORD_ONE_UPPERCASE' }))
            .matches(/[a-z]/, formatMessage({ id: 'PASSWORD_ONE_LOWERCASE' }))
            .matches(/[0-9]/, formatMessage({ id: 'PASSWORD_ONE_NUMBER' }))
            .matches(/[^A-Za-z0-9]/, formatMessage({ id: 'PASSWORD_ONE_SPECIAL' })),
        confirmPassword: Yup.string()
            .required(formatMessage({ id: 'CONFIRM_PASSWORD_REQUIRED' }))
            .oneOf([Yup.ref('password')], formatMessage({ id: 'PASSWORDS_MUST_MATCH' })),
    });

    const otpValidationSchema = Yup.object().shape({
        otp: Yup.string()
            .required(formatMessage({ id: 'OTP_REQUIRED' }))
            .length(6, formatMessage({ id: 'OTP_LENGTH' }, { length: 6 })),
    });

    const passwordFormik:any = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: passwordValidationSchema,
        onSubmit: async (values: any) => {
            dispatch(SendAdminPasswordAction({ email: 'admin@gmail.com' }));
            setPasswordData(values.password);
            setResendTimer(30); // start cooldown for resend button
        },
    });

    const otpFormik: any = useFormik({
        initialValues: {
            otp: '',
        },
        validationSchema: otpValidationSchema,
        onSubmit: async (values) => {
            try {
                if (!passwordData && !values.otp) {
                    alert(formatMessage({ id: 'ERROR_OCCURRED' }));
                }
                await dispatch(ConfirmResetAction({ email: 'admin@gmail.com', password: passwordData, otp: values.otp }));
                if (otpStage) {
                    passwordFormik.resetForm();
                    otpFormik.resetForm();
                    navigate('/')
                } else {
                    alert(formatMessage({ id: 'INVALID_OTP' }));
                }
            } catch (err) {
                alert(formatMessage({ id: 'ERROR_OCCURRED' }));
                console.error(err);
            }
        }
    });

    const handleResendOTP = () => {
        dispatch(SendAdminPasswordAction({ email: 'admin@gmail.com' }));
        setResendTimer(30);
        // alert(formatMessage({ id: 'OTP_RESENT_SUCCESS' }));
    };

    return (
        <div className="container py-5">
            {otpStage && (
                <BackButton className="mb-4" label={formatMessage({ id: 'BACK' })} />
            )}

            <div className="card shadow-sm rounded-4 p-4 mx-auto" style={{ maxWidth: 600 }}>

                {!otpStage ? (
                    <>
                        <h3 className="mb-4 text-center">{formatMessage({ id: 'CHANGE_PASSWORD' })}</h3>
                        <FormikProvider value={passwordFormik}>
                            <Form onSubmit={passwordFormik.handleSubmit} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                {/* <div className="mb-3">
                                    <Field name="password" type="password" label={formatMessage({ id: 'PASSWORD' })} component={FieldInputText} required />
                                </div> */}
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'black' }}>{formatMessage({ id: 'PASSWORD' })}<span className="text-danger">*</span></label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={passwordFormik.values.password}
                                        onChange={(e) => passwordFormik.setFieldValue('password', e.target.value.replace(/\s/g, ''))}
                                        required
                                        placeholder={formatMessage({ id: 'ENTER_PASSWORD' })}
                                        maxLength={10}
                                    />

                                    {passwordFormik.values.password && (
                                        <ul className="mt-2 list-unstyled mb-0">
                                            {[
                                                { regex: /[A-Z]/, label: formatMessage({ id: 'PASSWORD_ONE_UPPERCASE' }) },
                                                { regex: /[a-z]/, label: formatMessage({ id: 'PASSWORD_ONE_LOWERCASE' }) },
                                                { regex: /[0-9]/, label: formatMessage({ id: 'PASSWORD_ONE_NUMBER' }) },
                                                { regex: /[^A-Za-z0-9]/, label: formatMessage({ id: 'PASSWORD_ONE_SPECIAL' }) },
                                            ].map((rule, idx) => {
                                                const passed = rule.regex.test(passwordFormik.values.password);
                                                return (
                                                    <li key={idx} className="d-flex align-items-center gap-2 small">
                                                        <i className={`bi ${passed ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'}`}></i>
                                                        <span className={passed ? 'text-success' : 'text-danger'}>
                                                            {rule.label}
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'black' }}>
                                        {formatMessage({ id: 'CONFIRM_PASSWORD' })}
                                        <span className="text-danger">*</span>
                                    </label>

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        value={passwordFormik.values.confirmPassword}
                                        onChange={(e) =>
                                            passwordFormik.setFieldValue(
                                                'confirmPassword',
                                                e.target.value.replace(/\s/g, '')
                                            )
                                        }
                                        onBlur={passwordFormik.handleBlur} // 👈 needed for showing error
                                        placeholder={formatMessage({ id: 'ENTER_CONFIRM_PASSWORD' })}
                                        required
                                        maxLength={10}
                                    />

                                    {/* ✅ show error message */}
                                    {passwordFormik.touched.confirmPassword &&
                                        passwordFormik.errors.confirmPassword && (
                                            <div className="text-danger small mt-1">
                                                {passwordFormik.errors.confirmPassword}
                                            </div>
                                        )}
                                </div>


                                {/* <div className="mb-3">
                                    <label className="form-label" style={{ color: 'black' }}>{formatMessage({ id: 'CONFIRM_PASSWORD' })}<span className="text-danger">*</span></label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        value={passwordFormik.values.confirmPassword}
                                        onChange={(e) =>
                                            passwordFormik.setFieldValue('confirmPassword', e.target.value.replace(/\s/g, ''))
                                        } 
                                        placeholder={formatMessage({ id: 'ENTER_CONFIRM_PASSWORD' })}
                                        required
                                        maxLength={10}
                                    />
                                </div> */}
                                <div className="text-center">
                                    <button type="submit" style={{ background: "#185fdb", border: "1px solid #185fdb" }} className="py-3 text-white w-100">
                                        {formatMessage({ id: 'save' })}
                                    </button>
                                </div>
                            </Form>
                        </FormikProvider>
                    </>
                ) : (
                    <>
                        <h3 className="mb-4 text-center">{formatMessage({ id: 'OTP_VERIFICATION' })}</h3>
                        <FormikProvider value={otpFormik}>
                            <Form onSubmit={otpFormik.handleSubmit} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <div className="mb-3">
                                    <Field name="otp" type="text" label={formatMessage({ id: 'ENTER_OTP' })} component={FieldInputText}
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                        }}
                                        maxLength={6}
                                        placeholder={formatMessage({ id: 'ENTER_OTP_PLACEHOLDER' })}
                                        required />
                                </div>
                                <div className="text-center mb-3">
                                    <button type="submit" style={{ background: "#185fdb", border: "1px solid #185fdb", color: "white" }} className="py-3 w-100" disabled={otpFormik.isSubmitting}>
                                        {otpFormik.isSubmitting
                                            ? formatMessage({ id: 'VALIDATING_OTP' })
                                            : formatMessage({ id: 'VERIFY_OTP' })}
                                    </button>
                                </div>
                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-link"
                                        onClick={handleResendOTP}
                                        disabled={resendTimer > 0}
                                    >
                                        {resendTimer > 0
                                            ? `${formatMessage({ id: 'RESEND_OTP' })} (${resendTimer}s)`
                                            : formatMessage({ id: 'RESEND_OTP' })}
                                    </button>
                                </div>
                            </Form>
                        </FormikProvider>
                    </>
                )}
            </div>
        </div>
    );
};

export default ChangePasswordForm;
