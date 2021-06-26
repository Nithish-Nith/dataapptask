import React, { useEffect, useState } from "react";
import { Container, Row, Card, CardGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import DataCard from "../post/datacard";

const UserDetails = (props) => {
  const { item } = props.location.Props;
  console.log(item);

  const userurl = `https://gorest.co.in/public-api/users/${item.id}/posts`;
  const [collecteduserdata, Udata] = useState(null);
  console.log(collecteduserdata);
  useEffect(() => {
    axios.get(userurl).then((response) => {
      Udata(response.data);
    });
  }, [userurl]);
  return (
    <div>
      <h1>User details</h1>
      <Container>
        <Row>
          <Card style={{ width: "18rem", margin: "10px" }}>
            <Card.Body>
              <Card.Title> {item.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {item.status}
              </Card.Subtitle>
              <Card.Text>{item.email}</Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>

      <div>
        <Container>
          <Row>
            <CardGroup>
              {collecteduserdata
                ? collecteduserdata.data.map((item, value) => (
                    <DataCard key={value} val={item} isFooterVisible={false} />
                  ))
                : null}
            </CardGroup>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default UserDetails;
