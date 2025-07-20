export interface IUser {
  id: string;
  nombre: string;
  correo: string;
  perfil_url: string;
  tipo_usuario: string;
  rut: string;
  telefono: string;
}

export interface IManicure {
  ubicacion: string;
  modalidad_atencion: string;
  servicio_id: string;
  disponibilidad: string;
  comuna_id: string;
}
export interface IService {
  id: string;
  nombre: string;
  descripcion: string;
  precio_base: string;
}

export interface IWorks {
  usuario_id: string;
  fotos_trabajos: string;
  id: number;
}
export interface IEditManicure {
  id: string;
  nombre: string;
  correo: string;
  telefono: string;
  rut: string;
  tipo_usuario: "manicura" | "clienta"; // extendible si tenés más roles
  perfil: IManicurePerfil[]; // relación uno a varios, aunque en práctica sea uno solo
}

export interface IManicurePerfil {
  id: string;
  perfil_url: string;
  servicio_id: string;
  disponibilidad: string;
  fotos_trabajos_id: string;
  modalidad_atencion: "DOMICILIO" | "ESTABLECIMIENTO";
  ubicacion: string;
  latitud: string;
  longitud: string;
}
