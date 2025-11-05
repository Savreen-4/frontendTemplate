import { Button, Spinner } from "react-bootstrap";

const SubmitButton = (props) => {
  return (
    <Button
      type={props.type}
      disabled={props.loading}
      style={props.style} 
      className="w-100"
    >
      {props.loading ? (
        <>
          <Spinner animation="border" size="sm" className="me-2" role="status" aria-hidden="true" />
          Please Wait
        </>
      ) : (
        props.title
      )}
    </Button>
  );
};

export default SubmitButton;
