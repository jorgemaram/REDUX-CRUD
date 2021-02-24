import { AGREGAR_PRODUCTO, AGREGAR_PRODUCTO_ERROR, AGREGAR_PRODUCTO_EXITO } from '../types';

//Crear nuevos productos

export function crearNuevoProductoAction(producto) {
    return () => {
        console.log(producto);
    }
}