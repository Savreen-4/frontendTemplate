import { Form } from "react-bootstrap";
import { getIn } from "formik";
import React from "react";

const FieldInputText = ({
  field,
  form,
  label,
  required,
  type = "text",
  ...props
}: any) => {
  const error = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);
  const isNumber = type === "number";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isNumber) return;

    const allowedKeys = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ];
    const isDigit = /^\d$/.test(e.key);

    if (!isDigit && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (isNumber) {
      value = value.replace(/\D/g, ""); // remove non-digits
    }
    form.setFieldValue(field.name, value);
  };

  return (
    <div>
      <Form.Group className="mb-3" controlId={`control-${field.name}`}>
        {/* Label */}
        {label && (
          <Form.Label className="form-label fs-6 fw-bolder text-dark">
            {label}
            {required && <span style={{ color: "#ff8080" }}> *</span>}
          </Form.Label>
        )}

        {/* Input or Textarea */}
        <Form.Control
          {...field}
          {...props}
          as={type === "textarea" ? "textarea" : "input"}
          rows={type === "textarea" ? 8 : undefined}
          style={
            type === "textarea"
              ? { minHeight: "160px", resize: "vertical" }
              : {}
          }
          className="shadow-sm rounded-3 px-3 py-2"
          isInvalid={!!(touch && error)}
          type={type}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />

        {/* Error Message */}
        {touch && error && (
          <Form.Text
            className="text-danger"
            style={{ marginTop: "5px", fontSize: "13px" }}
          >
            {error}
          </Form.Text>
        )}
      </Form.Group>
    </div>
  );
};

export default FieldInputText;
