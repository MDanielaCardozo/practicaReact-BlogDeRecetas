import { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { cantidadCaracteres } from './helpers';

const EditarReceta = () => {
    //Traer el parametro
    const {id} = useParams();
    console.log(id);

    const [receta, setReceta] = useState({});
    const URL = process.env.REACT_APP_API_BLOGDERECETAS;
    //Crear variable de referencia(reemplazo de state)
    const nombreRecetaRef = useRef('');
    const imagenRef = useRef('');
    //navigate
    const navegacion = useNavigate();

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

    const handleSubmit = async(e) => {
        e.preventDefault();
        //validar que todos los campos son correctos
        console.log(nombreRecetaRef)
        console.log(nombreRecetaRef.current)
        console.log(nombreRecetaRef.current.value)
        if(cantidadCaracteres(nombreRecetaRef.current.value) && validarPrecio(precioRef.current.value)){

            //crear un objeto con los datos modificados
            const recetaEditar = {
                nombreReceta: nombreRecetaRef.current.value,
                imagen: imagenRef.current.value,
                precio: precioRef.current.value,
                categoria: receta.categoria
            }
            console.log(recetaEditar);
            //pedir a la API la actualizacion
            try {
                const resp = await fetch(`${URL}/${id}`,{
                    method: "PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(RecetaEditar)
                    })
                    if(resp.status === 200){
                        Swal.fire(
                            'Receta editada!',
                            'Su Receta fue correctamente editada',
                            'success'
                          );
                          //redirecciono a la pagina de Recetas
                          navegacion('/administrar');
                    }
            } catch (error) {
                console.log(error)
                //mostrar un mensaje al usuario
            }
            //redireccionar a la web de la tabla de Recetas
        }else{
            //mostrar un mensaje de error de validacion de datos del usuario
        }
    }
    return (
        <section className="container">
      <h1 className="display-4 mt-5">Editar Receta</h1>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNombreReceta">
          <Form.Label>Nombre de la Receta*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Café"
            defaultValue={receta.nombreReceta}
            ref={nombreRecetaRef}
           />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/foto/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
            defaultValue={receta.imagen}
            ref={imagenRef}
            />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Categorías*</Form.Label>
          <Form.Select value={receta.categoria} onChange={e=>setReceta({...receta,categoria: e.target.value})}>
            <option value=''>Seleccione una opcion</option>
            <option value='bebida-caliente'>Almuerzos</option>
            <option value='bebida-fria'>Cenas</option>
            <option value='dulce'>Postres</option>
            <option value='salado'>Dips</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </section>
    );
};

export default EditarReceta;