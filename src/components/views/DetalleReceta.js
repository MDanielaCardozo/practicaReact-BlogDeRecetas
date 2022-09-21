import React from 'react';
import { Badge, Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


const DetalleReceta = () => {

    const {id} = useParams();
    console.log(id);
    const URL = process.env.REACT_APP_API_BLOGDERECETAS;
    const [receta, setReceta] = useState({});

    useEffect(() => {
        consultaAPI();
    },[])

    const consultaAPI = async () => {
        try {
            const respuesta = await fetch(URL+'/'+id);
            const dato = await respuesta.json();
            setReceta(dato);
            
        } catch (error) {
            console.log(error)            
        }
    }
    return (
        <Card className='container my-5'>
            <Row className='w-75'>
                <Col md={6}>
                    <img src={receta.imagen} alt={receta.nombreReceta} className="w-100" />
                </Col>
                <Col md={6} className="py-3">
                <h3>{receta.nombreReceta}</h3>
                <hr/>
                <Badge bg="success">{receta.categoria}</Badge>
                <p className='mt-3'><b>Precio: ${receta.precio}</b></p>
                </Col>
            </Row>
        </Card>
    );
};

export default DetalleReceta;