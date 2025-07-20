export interface AgendaItem {
  id: string;
  perfil_id: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
}

export interface ServicioItem {
  id: string;
  nombre: string;
  precio_base: number;
}

export interface IBooks {
  id: string;
  agenda_id: string;
  clienta_id: string;
  precio: number;
  fecha_reserva: string;
  estado: string;
  agenda: {
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    perfil: {
      modalidad_atencion: string;
      ubicacion: string;
      latitud: string;
      longitud: string;
      perfil: {
        id: string;
        telefono: string;
        nombre: string;
      };
    };
  };
}
export interface Reserva {
  id: string;
  fecha_reserva: string;
  estado: "pendiente" | "confirmado" | "cancelado";
  agenda: Agenda | null;
  clienta: Usuario;
}

export interface Agenda {
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  usuario_id: string;
  perfil: {
    id: string;
    nombre: string;
  };
}

export interface Usuario {
  nombre: string;
  telefono: string;
  tipo_usuario: "clienta" | "manicurista";
}
