import { AGREGAR_PRODUCTO, AGREGAR_PRODUCTO_ERROR, AGREGAR_PRODUCTO_EXITO } from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//Crear nuevos productos

export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto());
        try {
            //insertar en la API
            await clienteAxios.post('/productos', producto);

            //Si todo OK, actualizar state
            dispatch(agregarProductoExito(producto));

            //Alerta 
            Swal.fire(
                'Correcto',
                'El producto se añadió correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            //si hay error, cambiar state
            dispatch(agregarProductoError(true));

            //Alerta 
            Swal.fire({
                icon:'error',
                title: 'Algo salió mal...',
                text: 'Hubo un error, inténtalo de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO, 
    payload: true
});

//Si el producto se guarda en la DB
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//Si hubo error 
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})