import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Pagination, Row } from "react-bootstrap";
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
  if (!userId) {
    navigate("/");
  }
  const [page, setPage] = useState(1);
  const { data } = trpc.useQuery([
    "workout.getAll",
    { userId: userId ? userId : "", limit: 10, page: page - 1 },
  ]);
  const [workoutName, setWorkoutName] = useState("");
  return (
    <Container>
      <Row>
        <Col>
          <h1>Workouts 💪</h1>
          <h2>Click on any text below to go to that workout!</h2>
          {data?.items.map((item) => (
            <h3
              key={item.id}
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/workouts/${item.id}`);
              }}
            >
              {`${new Date(item.created_at).getHours() % 12 || 12}:${new Date(
                item.created_at
              )
                .getMinutes()
                .toString()
                .padStart(2, "0")} ${
                Math.floor(new Date(item.created_at).getHours() / 12) == 0
                  ? "AM"
                  : "PM"
              }  - ${item.name}`}
            </h3>
          ))}
        </Col>
      </Row>
      <Pagination>
        {(() => {
          const items = [];
          for (let i = 1; i <= (data?.pages ? data?.pages : 0); i++) {
            items.push(
              <Pagination.Item
                key={i}
                active={page == i}
                onClick={() => {
                  setPage(i);
                }}
              >
                {i}
              </Pagination.Item>
            );
          }
          return items;
        })()}
      </Pagination>
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
