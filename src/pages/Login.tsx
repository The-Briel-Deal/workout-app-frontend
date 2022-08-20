import { ChangeEvent, useState } from "react";
import { trpc } from "../utils/trpc";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
export default () => {
  // const excercises = trpc.useQuery([
  //   "workout.getAll",
  //   "0526d478-ea1d-439d-92d3-b23743cb488d",
  // ]);
  const [loginState, setLoginState] = useState({ email: "", password: "" });
  const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.attributes[1].value;
    const value = e.target.value;
    setLoginState({ ...loginState, [type]: value });
  };
  return (
    <Container>
      {/* {excercises.data?.map((excercise) => (
        <h1>{excercise.name}</h1>
      ))} */}
      <Row>
        <Col>
          <Form style={{ paddingTop: "40%" }}>
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
            <Button variant="primary" onClick={() => {}}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
