import React from 'react';
import { Form } from "react-bootstrap";
import { Autocomplete } from '@react-google-maps/api';

const FieldAddressInput = ({
  field,
  form,
  label,
  placeholder,
  required,
  handleLoad,
  handlePlaceChanged,
  ...props
}: any) => {
  const error = form?.errors?.[field?.name];
  const touch = form?.touched?.[field?.name];

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Set the address value being typed
    form.setFieldValue(field.name, value);

    // Reset all related fields on manual typing
    form.setFieldValue('street', '');
    form.setFieldValue('city', '');
    form.setFieldValue('state', '');
    form.setFieldValue('postalCode', '');
    form.setFieldValue('location', { type: 'Point', coordinates: [0, 0] });
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

      {/* Google Autocomplete Input */}
      <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
        <Form.Control
          {...field}
          type="text"
          name={field.name}
          placeholder={placeholder || "Search for a place"}
          className="commonInput form-control"
          value={field.value}
          onChange={handleManualChange} // ✅ Use manual change handler
          isInvalid={!!(touch && error)}
          autoComplete="off"
          {...props}
        />
      </Autocomplete>

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

export default FieldAddressInput;
