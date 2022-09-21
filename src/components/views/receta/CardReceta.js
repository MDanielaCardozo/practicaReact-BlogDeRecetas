import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CardReceta = ({ receta }) => {
  return (
    <Card className='my-4'>
        <Card.Img variant="top" src={receta.imagen} className="img-fluid"/>
        <Card.Body>
          <Card.Title>{receta.nombreReceta}</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link to={`/administrar/receta/detalle/${receta._id}`} className='btn btn-danger me-2'>Ver más</Link>
        </Card.Footer>
    </Card>    
  );
};

export default CardReceta;