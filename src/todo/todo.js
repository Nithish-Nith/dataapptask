import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row, CardGroup, Pagination } from "react-bootstrap";
import axios from "axios";
import TodoData from "./todoData";

const DataTodo = () => {
  const [pagevalue, getpagevalue] = useState(1);

  const fetchVal = (e) => {
    getpagevalue(e.target.text);
    console.log(pagevalue);
  };

  const onClickNext = () => {
    const tempPageval = parseInt(pagevalue) + parseInt("1");
    getpagevalue(tempPageval);
  };

  const onClickPrevious = () => {
    const tempPageval = parseInt(pagevalue) - parseInt("1");
    getpagevalue(tempPageval);
  };

  const onClickFirst = () => {
    getpagevalue(1);
  };

  const onClickLast = () => {
    getpagevalue(paginationData.pagination.pages);
  };

  const url = `https://gorest.co.in/public-api/todos?page=${pagevalue}`;
  const [collectedata, fdata] = useState(null);
  //console.log(collectedata.meta.pagination.page);
  const [paginationData, updatePdata] = useState(null);

  useEffect(() => {
    axios.get(url).then((response) => {
      fdata(response.data.data);
      updatePdata(response.data.meta);
    });
  }, [url]);

  let items = [];

  if (paginationData) {
    if (pagevalue <= 3) {
      items.push(<Pagination.First disabled />);
      items.push(<Pagination.Prev disabled />);

      items.push(<Pagination.Item onClick={fetchVal}>{1}</Pagination.Item>);
      items.push(<Pagination.Item onClick={fetchVal}>{2}</Pagination.Item>);
      items.push(<Pagination.Item onClick={fetchVal}>{3}</Pagination.Item>);

      items.push(<Pagination.Next onClick={onClickNext}></Pagination.Next>);
      items.push(<Pagination.Last onClick={onClickLast}></Pagination.Last>);
    } else if (pagevalue > 3) {
      items.push(<Pagination.First onClick={onClickFirst} />);
      items.push(<Pagination.Prev onClick={onClickPrevious} />);

      items.push(
        <Pagination.Item onClick={fetchVal}>
          {parseInt(pagevalue) - parseInt("1")}
        </Pagination.Item>
      );
      items.push(
        <Pagination.Item
          active
          style={{ pointerEvents: "none" }}
          onClick={fetchVal}
        >
          {pagevalue}
        </Pagination.Item>
      );
      items.push(
        <Pagination.Item onClick={fetchVal}>
          {parseInt(pagevalue) + parseInt("1")}
        </Pagination.Item>
      );

      items.push(<Pagination.Next onClick={onClickNext}></Pagination.Next>);
      items.push(<Pagination.Last onClick={onClickLast}></Pagination.Last>);
    }
  } else {
    return <div></div>;
  }

  return (
    <div>
      <Container>
        <Row>
          <CardGroup>
            {collectedata.map((item, value) => (
              <TodoData key={value} val={item} />
            ))}
          </CardGroup>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <Pagination style={{ margin: "10px 0 10px 0 " }}>
              {items}
            </Pagination>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DataTodo;
