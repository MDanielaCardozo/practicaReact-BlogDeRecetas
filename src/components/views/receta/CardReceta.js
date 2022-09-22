import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CardReceta = ({ receta }) => {
  return (
    <Card className='my-4 text-bg-dark'>
        <Card.Img variant="top" src={receta.imagen} className="img-fluid"/>
        <Card.Body>
          <Card.Title>{receta.nombreReceta}</Card.Title>
          <Card.Text>
            {receta.ingredientes}
            {receta.descripcion}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link to={`/administrar/receta/detalle/${receta._id}`} className='btn btn-danger me-2'>Ver más</Link>
        </Card.Footer>
    </Card>    
  );
};

export default CardReceta;