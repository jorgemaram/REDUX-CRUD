import {AGREGAR_PRODUCTO, AGREGAR_PRODUCTO_ERROR, AGREGAR_PRODUCTO_EXITO} from '../types';

//cada reducer tiene su propio state
const initialState = {
    productos: [],
    error: null,
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        default: return state;
    }
}