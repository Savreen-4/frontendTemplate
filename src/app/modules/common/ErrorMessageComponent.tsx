import { ErrorMessage } from "formik";
import React from "react";

const ErrorMessageComponent = ({ name }) => (
  <div className="text-danger">
    <ErrorMessage name={name} />
  </div>
);

export default ErrorMessageComponent;
