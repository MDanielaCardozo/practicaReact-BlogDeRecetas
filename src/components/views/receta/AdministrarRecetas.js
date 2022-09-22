import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemReceta from "./ItemReceta";

const AdministrarRecetas = () => {

  const URL = process.env.REACT_APP_API_BLOGDERECETAS;
  console.log(URL);
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    consultarAPI();
  },[])

  const consultarAPI = async () =>{
    // peticion get
    try{
      // codigo que quiero ejecutar
      const respuesta = await fetch(URL);
      const listaRecetas = await respuesta.json();
      console.log(respuesta);
      console.log(listaRecetas);
      setRecetas(listaRecetas);

    }catch(error){
      console.log(error);
      // agregar un mensaje intuitivo para el usuario
    }
  }

  return (
    <section className="container">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4">Recetas disponibles</h1>
        <Link to='/administrar/receta/crear' className="btn btn-primary">Agregar</Link>
      </div>
      <hr />
      <Table responsive striped bordered hover>
        <thead className="bg-light">
          <tr>
            <th>Cod.</th>
            <th>Receta</th>
            <th>Url de imagen</th>
            <th>Categoria</th>
            <th>Ingredientes</th>
            <th>Descripción</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody className="bg-light">
          {/* aqui tengo que hacer un map */}
          {
            recetas.map((receta)=><ItemReceta key={receta._id} receta={receta} consultarAPI={consultarAPI}></ItemReceta>)
          }
        </tbody>
      </Table>
    </section>
  );
};

export default AdministrarRecetas;
