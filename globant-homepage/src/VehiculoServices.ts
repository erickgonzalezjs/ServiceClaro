// vehiculo.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VehiculoState } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private vehiculoStateSubject = new BehaviorSubject<VehiculoState>({
    vehiculos: [
      {
        patente: 'WL9925',
        horaEntrada: '09:00 27/02/2023',
        horaSalida: '10:00 27/02/2023',
        pagado: false,
        monto: 500
      },
    ]
  });

  vehiculoState$ = this.vehiculoStateSubject.asObservable();

  constructor() {}

  // Métodos para actualizar el estado del vehículo
}
