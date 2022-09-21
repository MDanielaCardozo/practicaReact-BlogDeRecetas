import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { cantidadCaracteres } from "./Helpers";
import { useNavigate } from "react-router-dom";

const CrearReceta = () => {
  // crear states
  const [nombreReceta, setNombreReceta] = useState("");
  const [imagen, setImagen] = useState("");
  const [categoria, setCategoria] = useState("");
  const [msjError, setMsjError] = useState(false);
  //variable de entorno con la direccion de mi api
  const URL = process.env.REACT_APP_API_BLOGDERECETAS;
  //inicializar el useNavigate
  const navegacion = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validar los datos
    if(cantidadCaracteres(nombreReceta)){
      setMsjError(false);
    // crear objeto
    const nuevaReceta = {
      nombreReceta,
      imagen,
      categoria
    }

    console.log(nuevaReceta);
    // enviar peticion a json-server (API) create
    try{
      const respuesta = await fetch(URL,{
        method: 'POST',
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(nuevaReceta)
      })

      if(respuesta.status === 201){
        //mostrar mensaje que todo salio bien
        Swal.fire(
          'Receta creada',
          'La receta fue agregada correctamente',
          'succes'
        );
        //redireccionar a la pagina administrar
        navegacion('/administrar');
      }

      console.log(respuesta)

    }catch(error){
      console.log(error)
      //mostrar un mensaje al usuario
    }
  }else{
    setMsjError(true);
  }
};
  
  return (
    <section className="container">
      <h1 className="display-4 mt-5">Nueva Receta</h1>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNombreReceta">
          <Form.Label>Nombre de la Receta*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Lasagna"
            onChange={(e) => setNombreReceta(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/foto/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
            onChange={(e) => setImagen(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Categorías*</Form.Label>
          <Form.Select onChange={(e) => setCategoria(e.target.value)}>
            <option value=''>Seleccione una opcion</option>
            <option value='Almuerzos'>Almuerzos</option>
            <option value='Cenas'>Cenas</option>
            <option value='Postres'>Postres</option>
            <option value='Dips'>Dips</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
      {
        (msjError)?(<Alert variant="danger" className="my-4">Debe corregir los datos</Alert>) : null
      }
      
    </section>
  );
};

export default CrearReceta;
