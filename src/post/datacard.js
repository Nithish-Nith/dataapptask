import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./datacard.css";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const DataCard = (props) => {
  const userPosts = props.overAlldata;
  console.log(userPosts);

  const userurl = `https://gorest.co.in/public-api/users?id=${props.val.user_id}`;
  const [collecteduserdata, Udata] = useState(null);
  useEffect(() => {
    axios.get(userurl).then((response) => {
      Udata(response.data);
    });
  }, [userurl]);

  return (
    <Col xs lg={4}>
      <Card style={{ padding: 10 }}>
        <Card.Body style={{ height: 650 }}>
          <Card.Title>{props.val.title}</Card.Title>
          {props.val.body}
          {props.isFooterVisible ? (
            <div>
              <a href="javascript:void(0)" onClick={props.onDeleteClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                  style={{ cursor: "pointer", color: "red" }}
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
              </a>
            </div>
          ) : null}
        </Card.Body>
        {props.isFooterVisible ? (
          <Card.Footer>
            {collecteduserdata
              ? collecteduserdata.data.map((item, value) => (
                  <Link
                    to={{
                      pathname: "/detail",
                      Props: { item: item },
                    }}
                  >
                    {item.name}
                  </Link>
                ))
              : null}
          </Card.Footer>
        ) : null}
      </Card>
    </Col>
  );
};

export default DataCard;
