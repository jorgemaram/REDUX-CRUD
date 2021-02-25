import { AGREGAR_PRODUCTO, AGREGAR_PRODUCTO_ERROR, AGREGAR_PRODUCTO_EXITO, COMENZAR_DESCARGA_PRODUCTOS, DESCARGA_PRODUCTOS_EXITO, DESCARGA_PRODUCTOS_ERROR, OBTENER_PRODUCTO_ELIMINAR, PRODUCTO_ELIMINADO_EXITO, PRODUCTO_ELIMINADO_ERROR } from '../types';
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

//Función que descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos());
        try {
            setTimeout(async() => {
                const respuesta = await clienteAxios.get('/productos');
                dispatch(descargaProductosExitosa(respuesta.data))
            }, 500);
        } catch (error) {
            console.log(error)
            dispatch(descargaProductosError());
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})


const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

//Selecciona y elimina el producto

export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());

            //Si se elimina, mostrar alerta
            Swal.fire(
                '¡Eliminado!', 'El producto ha sido eliminado correctamente.', 'success'
            )

        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError());
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})