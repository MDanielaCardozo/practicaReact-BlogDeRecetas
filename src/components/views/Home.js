import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import CardReceta from "./receta/CardReceta"

const Home = () => {
  const URL = process.env.REACT_APP_API_BLOGDERECETAS;
  console.log(URL);
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    consultaAPI();
  },[])

  const consultaAPI = async () =>{
    try {
      const respuesta = await fetch(URL);
      const listaRecetas = await respuesta.json();
      console.log(listaRecetas);
      setRecetas(listaRecetas);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="container">
      <h1 className="display-4 m-4">Pagina principal</h1>
      <hr />
      <Row xs={1} md={4} className="g-4">
        
        {
          recetas.map((receta)=><Col key={receta._id}><CardReceta receta={receta}></CardReceta></Col>)
        }
        
      </Row>
    </div>
  );
};

export default Home;