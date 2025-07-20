export interface IUserReseña {
  id: string;
  nombre: string;
  perfil_url: string | null;
}

export interface ICalificacionConUser {
  id: string;
  puntaje: number;
  comentario: string;
  usuario: IUserReseña;
}
