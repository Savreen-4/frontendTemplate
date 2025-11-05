import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Field, FormikProvider, useFormik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FieldInputText from "../../common/FieldInputText";
import SubmitButton from "../../common/SubmitButton";
import { errorMessage, successMessage } from "../../../utlis/common";

export function ChangePassword() {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [otpStage, setOtpStage] = useState(false);
  const [savedPassword, setSavedPassword] = useState("");
  const [email, setEmail] = useState("admin@yopmail.com");

  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const authState = useSelector((state: any) => state.auth);
  const resetPasswordSlice = useSelector(
    (state: any) => state.resetPasswordSlice
  );

  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters")
      .matches(/[A-Z]/, "One uppercase letter is required")
      .matches(/[a-z]/, "One lowercase letter is required")
      .matches(/[0-9]/, "One number is required")
      .matches(/[@#%!-]/, "One special character is required"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const otpSchema = Yup.object().shape({
    otp: Yup.string()
      .required("OTP is required")
      .length(6, "OTP must be 6 digits"),
  });

  const passwordFormik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit: async (values) => {
      try {
        setSavedPassword(values.password);

        // await dispatch(SendAdminPasswordAction({ email })); // Replace with real API call
        setOtpStage(true);
        // successMessage('OTP sent to your email');
      } catch (error) {
        errorMessage("Failed to send OTP");
      }
    },
  });

  const otpFormik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      try {
        // await dispatch(verifyOtpAndChangePassword({ email, otp: values.otp, password: savedPassword }));
        // successMessage('Password changed successfully');
        // navigate('/auth/login');
      } catch (error) {
        errorMessage("Invalid OTP");
      }
    },
  });

  return (
    <div className="container py-5">
      <div
        className="card shadow-sm rounded-4 p-4 mx-auto"
        style={{ maxWidth: 600 }}
      >
        <h3 className="text-center mb-4">Change Password</h3>
        {!otpStage ? (
          <FormikProvider value={passwordFormik}>
            <Form
              onSubmit={passwordFormik.handleSubmit}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <div className="mb-3 position-relative">
                <Field
                  name="password"
                  label="Password"
                  type={showPassword ? "password" : "text"}
                  component={FieldInputText}
                  placeholder="Enter new password"
                />
                <i
                  className={
                    showPassword
                      ? "bi bi-eye-slash-fill eyeIcon"
                      : "bi bi-eye-fill eyeIcon"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>

              <div className="mb-3 position-relative">
                <Field
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? "password" : "text"}
                  component={FieldInputText}
                  placeholder="Confirm new password"
                />
                <i
                  className={
                    showConfirmPassword
                      ? "bi bi-eye-slash-fill eyeIcon"
                      : "bi bi-eye-fill eyeIcon"
                  }
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </div>

              <SubmitButton
                title="Send OTP"
                loading={passwordFormik.isSubmitting}
              />
            </Form>
          </FormikProvider>
        ) : (
          <FormikProvider value={otpFormik}>
            <Form
              onSubmit={otpFormik.handleSubmit}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <div className="mb-3">
                <Field
                  name="otp"
                  label="OTP"
                  type="text"
                  component={FieldInputText}
                  placeholder="Enter the 6-digit OTP"
                />
              </div>
              <SubmitButton
                title="Verify OTP & Change Password"
                loading={otpFormik.isSubmitting}
              />
            </Form>
          </FormikProvider>
        )}
      </div>
    </div>
  );
}
