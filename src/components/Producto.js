import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

//Redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction } from '../actions/productoActions'

const Producto = ({ producto }) => {

    const { nombre, precio, id } = producto;

    const disptach = useDispatch();

    //Confirmar si desea eliminarlo
    const confirmarEliminarProducto = id => {
        //preguntar al usuario
        Swal.fire({
            title: `¿Estás seguro de eliminar ${nombre}?`,
            text: 'Esta acción es irreversible.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if(result.value) {//pasarlo al action
                disptach(borrarProductoAction(id));
            }
        })
    }

    return (
        <tr>
            <td>{nombre}</td>
            <td><span className='font-weight-bold'>{precio}€</span></td>
            <td className='acciones'>
                <Link to={`/productos/editar/${id}`} className='btn btn-primary mr-2'>Editar</Link>
                <button type='button' className='btn btn-danger' onClick={() => confirmarEliminarProducto(id)}>Eliminar</button>
            </td>
        </tr>
    );
}

export default Producto;