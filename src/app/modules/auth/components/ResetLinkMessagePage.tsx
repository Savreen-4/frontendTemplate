import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const ResetLinkPage = () => {
  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <Row>
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg">
            <Card.Body className="text-center p-5">
              <h4 className="mb-4 text-primary">Password Reset</h4>
              <p className="mb-4">
                A reset link has been sent to your email. Please check your inbox.
              </p>
               <Link to='/auth/login'>
              <Button
                variant="primary"
                style={{ backgroundColor: "#009ef7", borderColor: "#009ef7" }}
               >
                OK
              </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetLinkPage;
