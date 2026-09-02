"use client";

import { useState, type KeyboardEvent } from "react";

type Tarea = {
  id: number;
  texto: string;
  completado: boolean;
};

export default function Home() {
  const [tareas, setTareas] = useState<Tarea[]>([
    { id: 1, texto: "Configurar el repositorio", completado: true },
    { id: 2, texto: "Diseñar la interfaz", completado: false },
  ]);

  const [nuevaTarea, setNuevaTarea] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [textoEditado, setTextoEditado] = useState("");

  const agregarTarea = (evento: KeyboardEvent<HTMLInputElement>) => {
    if (evento.key !== "Enter") return;

    const texto = nuevaTarea.trim();
    if (!texto) return;

    const nueva: Tarea = {
      id: Date.now(),
      texto,
      completado: false,
    };

    setTareas([nueva, ...tareas]);
    setNuevaTarea("");
  };

  const marcarTarea = (id: number) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completado: !tarea.completado } : tarea
      )
    );
  };

  const empezarEdicion = (tarea: Tarea) => {
    setEditandoId(tarea.id);
    setTextoEditado(tarea.texto);
  };

  const confirmarEdicion = () => {
    const texto = textoEditado.trim();

    if (texto) {
      setTareas(
        tareas.map((tarea) =>
          tarea.id === editandoId ? { ...tarea, texto } : tarea
        )
      );
    }

    setEditandoId(null);
  };

  const eliminarTarea = (id: number) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  const pendientes = tareas.filter((tarea) => !tarea.completado).length;

  return <main>{}</main>;
}