"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/api/supabaseClient";
import ServiceSelector from "./SelectServices";

interface IEnteprise {
  service?: {
    id: string;
    nombre: string;
  };
}

interface Service {
  id: string;
  nombre: string;
}

export default function ServiceSelectorWrapper({ service }: IEnteprise) {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("Servicio")
        .select("id, nombre");
      if (error) {
        console.error("Error al obtener servicios:", error.message);
        return;
      }
      setServices(data || []);
    };

    fetchServices();
  }, []);

  return <ServiceSelector service={service} services={services} />;
}
