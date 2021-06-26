import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Col, Card } from "react-bootstrap";
const TodoData = (props) => {
  console.log(props.val.id);
  const userurl = `https://gorest.co.in/public-api/users?id=${props.val.user_id}`;
  const [tododata, Udata] = useState(null);
  // console.log(tododata);
  useEffect(() => {
    axios.get(userurl).then((response) => {
      Udata(response.data);
    });
  }, [userurl]);
  if (props.val.completed === true) {
    props.val.completed = "true";
  } else if (props.val.completed === false) {
    props.val.completed = "false";
  }

  return (
    <Col xs lg={4}>
      <Card style={{ width: 360, padding: 10 }}>
        <Card.Body
          style={{
            height: 160,
            backgroundColor:
              props.val.completed === "true" ? "#b3ffb3" : "#ffb3b3",
          }}
        >
          <Card.Title>{props.val.title}</Card.Title>
          <Card.Text>{props.val.completed}</Card.Text>
        </Card.Body>
        <Card.Footer style={{ margin: "10px 0 0 0" }}>
          {tododata
            ? tododata.data.map((item, value) => (
                <p style={{ margin: "0px" }}>{item.name}</p>
              ))
            : null}
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default TodoData;
