import React from "react";
import Form from "react-bootstrap/Form";

export const Buscador = () => {
  return (
    <div class="container" style={{ "padding-top": "5rem" }}>
      <h1>Introduce la estación</h1>
      <Form>
        <Form.Group className="input-lg mb-3" controlId="txt-search">
          <Form.Control
            type="text"
            placeholder="Puedes introducir el nombre o el número"
          />
        </Form.Group>
      </Form>
      <div class="container">
        <div
          class="row row-cols-2 row-cols-lg-2 g-2 g-lg-2"
          style={{ "margin-top": "3rem" }}
          id="filter-records"
        ></div>
      </div>
    </div>
  );
};
