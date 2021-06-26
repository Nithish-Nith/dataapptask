import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Col,
  Container,
  Row,
  CardGroup,
  Pagination,
} from "react-bootstrap";
import axios from "axios";
import DataCard from "./datacard";
import { Link } from "react-router-dom";

const DataPost = () => {
  const [pagevalue, getpagevalue] = useState(1);

  const fetchVal = (e) => {
    getpagevalue(e.target.text);
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

  const url = `https://gorest.co.in/public-api/posts?page=${pagevalue}`;
  const [collectedata, fdata] = useState(null);
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

  const onDeleteClick = (id) => {
    var RemainingData = collectedata.filter(function (item) {
      return item.id !== id;
    });
    console.log(RemainingData);
    fdata(RemainingData);
  };

  return (
    <div>
      <Container>
        <div style={{ padding: 10 }}>
          <Link to="/create">
            <Button className="btn"> Add </Button>
          </Link>
        </div>
        <Row>
          <CardGroup>
            {collectedata.map((item, value) => (
              <DataCard
                key={item.id}
                val={item}
                isFooterVisible={true}
                onDeleteClick={() => onDeleteClick(item.id)}
              />
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

export default DataPost;
