import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { trpc } from "../utils/trpc";

export default () => {
  const utils = trpc.useContext();
  const { data: excercises } = trpc.useQuery(["excercise.getAll"], {
    onSuccess(data) {
      setSetState({ ...setState, excercise: data[0].id });
    },
  });
  const [setState, setSetState] = useState({
    weight: "",
    excercise: "",
    reps: "",
  });
  const createSet = trpc.useMutation("set.create", {
    onSuccess() {
      setSetState({ ...setState, weight: "", reps: "" });
      utils.invalidateQueries(["set.getAll"]);
    },
  });
  const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.id;
    const value = e.target.value;
    setSetState({ ...setState, [type]: value });
  };
  const { id } = useParams();
  const { data: sets } = trpc.useQuery(["set.getAll", id ? id : ""]);
  return (
    <Container>
      <Row>
        <Col>
          {sets
            ? sets.map((set) => (
                <h3>{`${set.Exercise.name} - ${set.weight_lb}ib x ${set.reps}`}</h3>
              ))
            : ""}
        </Col>
      </Row>
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Excercise</Form.Label>
            <Form.Select
              onChange={(e) => {
                setSetState({ ...setState, excercise: e.target.value });
              }}
              value={setState.excercise}
              aria-label="Select Excercise"
              id="excercise"
            >
              {excercises?.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >{`${item.name} - ${item.intensity}`}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Weight</Form.Label>
            <Form.Control
              value={setState.weight}
              onChange={formChange}
              id="weight"
              placeholder="Weight LB"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Reps</Form.Label>
            <Form.Control
              value={setState.reps}
              onChange={formChange}
              id="reps"
              placeholder="Reps"
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={() => {
              createSet.mutate({
                excerciseId: setState.excercise,
                workoutId: id ? id : "",
                weightLb: parseInt(setState["weight"]),
                reps: parseInt(setState["reps"]),
              });
            }}
          >
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};
