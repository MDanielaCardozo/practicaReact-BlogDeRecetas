import React from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ItemReceta = ({receta, consultarAPI}) => {

    console.log(receta);
    const{nombreReceta, _id, categoria, imagen} = {...receta}
    const URL = process.env.REACT_APP_API_BLOGDERECETAS;

    const handleDelete = () => {
      Swal.fire({
        title: 'Esta seguro de borrar esta Receta?',
        text: "No puede volver este paso atras!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'borrar'
      }).then( async (result) => {
        if (result.isConfirmed) {

          //realizar la peticion para elimar Receta DELETE
          try{
            const parametros = {
              method: "DELETE"
            }
            const respuesta = await fetch(URL+'/'+_id,parametros);
            if(respuesta.status === 200){
              Swal.fire(
                'Receta eliminada!',
                'Su Receta fue correctamente eliminada',
                'success'
              )
              //recargar la  tabla de Recetas
              consultarAPI();
            }
    
          }catch(error){
            console.log(error)
          }
        }
      })
    }
  return (
      <tr>
        <td>{_id}</td>
        <td>{nombreReceta}</td>
        <td>{precio}</td>
        <td className="truncate">{imagen}</td>
        <td>{categoria}</td>
        <td>
          <Link to={`/administrar/receta/editar/${_id}`} className='btn btn-warning me-2'>Editar</Link>
          <Button variant="danger" onClick={handleDelete}>Borrar</Button>
        </td>
      </tr>
  );
};

export default ItemReceta;
