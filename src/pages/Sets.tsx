import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { trpc } from "../utils/trpc";

export default () => {
  const { id } = useParams();
  return (
    <Container>
      <Row>
        <Col>{id}</Col>
      </Row>
    </Container>
  );
};
