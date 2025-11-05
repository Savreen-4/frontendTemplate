import React from "react";
import Select from "react-select";
import { getIn } from "formik";

const FieldSelectInput = ({
  field,
  form,
  label,
  required,
  options,
  isMulti,
  getValues,
  disabled,
  ...props
}: any) => {
  const error = getIn(form?.errors, field?.name);
  const touch = getIn(form?.touched, field?.name);

  const handleChange = (selectedOptions: any) => {
    const value = isMulti
      ? selectedOptions.map((option: any) => option.value)
      : selectedOptions?.value;

    // Set the value in Formik
    form.setFieldValue(field.name, value);

    // Call custom onChange if provided
    if (getValues) getValues(selectedOptions);
  };

  const value = isMulti
    ? options.filter((option: any) =>
        (field.value || []).includes(option.value)
      )
    : options.find((option: any) => option.value === field.value);

  return (
    <div className="mb-3">
      {/* Label */}
      {label && (
        <label className="form-label fs-6 fw-bolder text-dark">
          {label}
          {required && <span style={{ color: "#ff8080" }}> *</span>}
        </label>
      )}

      {/* Select Input */}
      <Select
        isMulti={isMulti}
        options={options}
        value={value}
        onChange={handleChange}
        isDisabled={disabled || false}
        classNamePrefix="react-select"
        {...props}
      />

      {/* Error Message */}
      {touch && error && (
        <div
          className="text-danger"
          style={{ marginTop: "5px", fontSize: "13px" }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default FieldSelectInput;
