import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Form, Button, Col, Container, Row, Card } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

const Createpost = () => {
  const [title, settitle] = useState("");
  const [describe, setdescribe] = useState("");
  const [dropdown, setDropdown] = useState("123");
  const handlechange = (eventkey) => {
    setDropdown(`${eventkey}`);
  };

  const userurl = "https://gorest.co.in/public-api/users";
  const [collecteduserdata, Udata] = useState(null);
  useEffect(() => {
    axios.get(userurl).then((response) => {
      Udata(response.data);
      // console.log(response.data.data.id)
    });
  }, [userurl]);

  const token =
    "fd363b8241ffd5ded0e5391d11dd3ee14ce0054e2535c26153913d8f37c2ed83";
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(dropdown);
    console.log(title);
    console.log(describe);

    axios({
      method: "POST",
      url: `https://gorest.co.in/public-api/users/${dropdown}/posts`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({
        title: title,
        body: describe,
      }),
    })
      .then((response) => {
        console.log(response);
        alert("Success");
        settitle("");
        setdescribe("");
      })
      .catch((error) => {
        console.log(error);
        alert("error");
      });
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Select the id </Form.Label>
                  <Dropdown onSelect={handlechange}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {dropdown}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {collecteduserdata
                        ? collecteduserdata.data.map((item, value) => {
                            return (
                              <Dropdown.Item eventKey={item.id} key={value}>
                                {item.id}
                              </Dropdown.Item>
                            );
                          })
                        : null}
                    </Dropdown.Menu>
                  </Dropdown>

                  <Form.Label>Enter the title</Form.Label>
                  <Form.Control
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                    type="text"
                    placeholder="Enter Title"
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Enter the description</Form.Label>
                  <Form.Control
                    value={describe}
                    onChange={(e) => setdescribe(e.target.value)}
                    as="textarea"
                    rows={3}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Createpost;
