// VehiculoProvider.tsx
import { useReducer } from "react"
import { VehiculoProviderProps, VehiculoState } from './interfaces';
import { VehiculoContext } from "./VehiculoContext"
import { vehiculoReducer } from "./VehiculoReducer"

const INITIAL_STATE: VehiculoState = {
    vehiculos: [
        {
            patente: 'WL9925',
            horaEntrada: '09:00 27/02/2023',
            horaSalida: '10:00 27/02/2023',
            pagado: false,
            monto: 500
        },
    ]
}

export const VehiculoProvider = ({ children }: VehiculoProviderProps) => {

    const [ vehiculoState, dispatch ] = useReducer( vehiculoReducer, INITIAL_STATE )

    return (
        <VehiculoContext.Provider value={vehiculoState}>
            {children}
        </VehiculoContext.Provider>
    )
}
