import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { trpc } from "../utils/trpc";

export default () => {
  const utils = trpc.useContext();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const createWorkout = trpc.useMutation("workout.create", {
    onSuccess() {
      utils.invalidateQueries(["workout.getAll"]);
      setWorkoutName("");
    },
  });
  let data: { id: string; name: string }[] | undefined = [];
  if (userId) {
    const resp = trpc.useQuery(["workout.getAll", userId]);
    data = resp.data;
  } else {
    navigate("/");
  }
  const [workoutName, setWorkoutName] = useState("");
  return (
    <Container>
      <Row>
        <Col>
          <h1>Workouts</h1>
          {data?.map((item) => (
            <h3
              onClick={() => {
                navigate(`/workouts/${item.id}`);
              }}
            >
              {item.name}
            </h3>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Workout Name</Form.Label>
              <Form.Control
                placeholder="Enter workout name"
                value={workoutName}
                isInvalid={false}
                onChange={(e) => {
                  setWorkoutName(e.target.value);
                }}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Button
              variant="primary"
              onClick={async () => {
                if (userId == null) {
                  navigate("/");
                } else {
                  await createWorkout.mutate({
                    name: workoutName,
                    userId: userId,
                  });
                }
              }}
            >
              Create Workout
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
