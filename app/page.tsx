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

  return <main>{}</main>;
}