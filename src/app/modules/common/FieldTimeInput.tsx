import { Form } from "react-bootstrap";
import { getIn } from "formik";

const FieldTimeInput = ({ field, form, label, required, ...props }: any) => {
  const error = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);

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

        {/* Time Input */}
        <Form.Control
          {...field}
          {...props}
          type="time"
          isInvalid={!!(touch && error)}
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

export default FieldTimeInput;
