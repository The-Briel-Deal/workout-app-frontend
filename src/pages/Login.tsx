import { ChangeEvent, useState } from "react";
import { trpc } from "../utils/trpc";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default () => {
  const [loginState, setLoginState] = useState({ email: "", password: "" });
  const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.attributes[1].value;
    const value = e.target.value;
    setLoginState({ ...loginState, [type]: value });
  };
  const { data, refetch: loginRefetch } = trpc.useQuery(
    ["user.get", { email: loginState.email, password: loginState.password }],
    { enabled: false }
  );
  const navigate = useNavigate();
  const login = async () => {
    const data = await loginRefetch();
    if (data.data) {
      localStorage.setItem("userId", data.data.id);
      navigate("/workouts");
    }
  };
  return (
    <Container
      style={{ display: "flex", height: "100%", justifyContent: "center" }}
    >
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={loginState.email}
                onChange={formChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={loginState.password}
                onChange={formChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={login}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
