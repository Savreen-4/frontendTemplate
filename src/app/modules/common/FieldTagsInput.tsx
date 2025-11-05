import React from "react";
import { Form } from "react-bootstrap";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const FieldTagsInput = ({ field, form, label, required, ...props }: any) => {
  const error = form?.errors?.[field?.name];
  const touch = form?.touched?.[field?.name];

  const handleChangeTags = (newTags: string[]) => {
    form.setFieldValue(field.name, newTags);
  };

  return (
    <Form.Group className="mb-3" controlId={`control-${field.name}`}>
      {/* Label */}
      {label && (
        <Form.Label className="form-label fs-6 fw-bolder text-dark">
          {label}
          {required && <span style={{ color: "#ff8080" }}> *</span>}
        </Form.Label>
      )}

      {/* Tags Input */}
      <TagsInput
        value={field.value}
        onChange={handleChangeTags}
        inputProps={{
          placeholder: "Add a tag",
        }}
        className="form-control" // Bootstrap styling for consistency
        {...props}
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
  );
};

export default FieldTagsInput;
