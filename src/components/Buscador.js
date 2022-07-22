import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import $ from "jquery";
import HTMLReactParser from "html-react-parser";

export const Buscador = () => {
  const [formText, setFormText] = useState("");
  const [contenidoResultados, setContenidoResultados] = useState("");
  const onChangeFormText = (e) => {
    let valorTexto = e.target.value;
    setFormText(valorTexto);
    if (valorTexto === "") {
      setContenidoResultados("<div></div>");
    } else {
      var regex = new RegExp(valorTexto, "i");
      var output = "";
      $.getJSON(
        "https://raw.githubusercontent.com/garridinsi/BuscadorRFIG/main/estaciones.json",
        function (data) {
          $.each(data, function (key, val) {
            if (
              val["NUMERO"].toString().search(regex) !== -1 ||
              val.NOMBRE.search(regex) !== -1
            ) {
              output += '<div className="col">';
              output +=
                '<div className="bg-success p-2 text-dark bg-opacity-25">';
              output += '<div style="margin:0.5rem;" className="">';
              output +=
                '<h5 style="text-transform: uppercase;">' +
                val.NOMBRE +
                "</h5>";
              output += "<p>" + val.NUMERO + "</p>";
              if (val.CERCANIAS === "SI" && val.FEVE === "NO") {
                //output += "<p>Dispone de Cercanías</p>";
                output +=
                  "<div className='d-flex justify-content-center'><img height='55rem' src='https://raw.githubusercontent.com/garridinsi/BuscadorRFIG/main/resources/img/cercanias.svg' alt='Logo Renfe Cercan&iacute;as. Esta estaci&oacute;n dispone de servicios de Cercan&iacute;as.' /></div>";
              }
              if (val.FEVE === "SI" && val.CERCANIAS === "NO") {
                output +=
                  "<div className='d-flex justify-content-center'><img height='55rem' src='https://raw.githubusercontent.com/garridinsi/BuscadorRFIG/main/resources/img/feve.svg' alt='Logo Renfe Feve. Esta estaci&oacute;n dispone de servicios de Feve.' /></div>";
              }
              if (val.FEVE === "SI" && val.CERCANIAS === "SI") {
                output +=
                  "<div className='d-flex justify-content-center'><img height='55rem' src='https://raw.githubusercontent.com/garridinsi/BuscadorRFIG/main/resources/img/cercanias.svg' alt='Logo Renfe Cercan&iacute;as. Esta estaci&oacute;n dispone de servicios de Cercan&iacute;as.' /> <img height='55rem' src='https://raw.githubusercontent.com/garridinsi/BuscadorRFIG/main/resources/img/feve.svg' alt='Logo Renfe Feve. Esta estaci&oacute;n dispone de servicios de Feve.' /></div>";
              }
              if (val.FEVE === "NO" && val.CERCANIAS === "NO") {
                output += "<div><p>No dispone de Cercanías ni FEVE</p></div>";
              }
              output += "</div>";
              output += "</div>";
              output += "</div>";
            }
          });
          output += "</div>";
          console.log(output);
          setContenidoResultados(output);
        }
      );
    }

    console.log(contenidoResultados);
  };

  return (
    <div
      style={{ paddingTop: "5rem", marginLeft: "3rem", marginRight: "3rem" }}
    >
      <h1>Introduce la estación</h1>
      <Form>
        <Form.Group className="input-lg mb-3" controlId="txt-search">
          <Form.Control
            type="text"
            value={formText}
            onChange={(e) => onChangeFormText(e)}
            placeholder="Puedes introducir el nombre o el número"
          />
        </Form.Group>
      </Form>
      <div
        className="row row-cols-2 row-cols-lg-2 g-2 g-lg-2"
        style={{ marginTop: "3rem" }}
        id="filter-records"
      >
        {HTMLReactParser(contenidoResultados)}
      </div>
    </div>
  );
};
