"use client";

import { count } from "console";
import { useState, type KeyboardEvent } from "react";

type Tarea = {
  id: number;
  texto: string;
  completado: boolean;
};

type TareaEliminada = Tarea & {
  eliminadaEn: string;
};

export default function Home() {
  const [tareas, setTareas] = useState<Tarea[]>([
    { id: 1, texto: "Configurar el repositorio", completado: true },
    { id: 2, texto: "Diseñar la interfaz", completado: false },
  ]);
  const [tareas_eliminadas, setEliminados] = useState<TareaEliminada[]>([]);

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

  const agregarTareaEliminada = (tarea: Tarea) => {
    const eliminada: TareaEliminada = {
      ...tarea,
      eliminadaEn: new Date().toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setEliminados([eliminada, ...tareas_eliminadas]);
  };

  const eliminarTarea = (id: number) => {
    const tarea = tareas.find((tarea) => tarea.id === id);
    if (tarea) agregarTareaEliminada(tarea);

   setTareas(tareas.filter((tarea) => tarea.id !== id));
  };
   
  const restaurarTarea = (id: number) => {
   const eliminada = tareas_eliminadas.find((tarea) => tarea.id === id);
   if (!eliminada) return;

  const { eliminadaEn, ...tarea } = eliminada;

  setTareas([tarea, ...tareas]);
  setEliminados(tareas_eliminadas.filter((tarea) => tarea.id !== id));
};

const vaciarPapelera = () => {
  setEliminados([]);
};

  const pendientes = tareas.filter((tarea) => !tarea.completado).length;

  return (
    <main className="contenedor-todo">
      <section className="tarjeta-todo">
        <header className="encabezado-todo">
          <h1>Lista de pendientes</h1>
          <p className="contador-todo">
            {pendientes} de {tareas.length} pendientes
          </p>
          <p>
            Total de tareas: {tareas.length}
          </p>
        </header>

        <input
          className="entrada-todo"
          type="text"
          placeholder="Escribe una tarea y presiona Enter..."
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          onKeyDown={agregarTarea}
        />

        <ul className="lista-todo">
          {tareas.length === 0 && (
            <li className="lista-vacia">Aún no tienes tareas.</li>
          )}

          {tareas.map((tarea) => (
            <li key={tarea.id} className="fila-tarea">
              <input
                type="checkbox"
                checked={tarea.completado}
                onChange={() => marcarTarea(tarea.id)}
              />

              {editandoId === tarea.id ? (
                <input
                  className="campo-edicion"
                  type="text"
                  value={textoEditado}
                  onChange={(e) => setTextoEditado(e.target.value)}
                  onBlur={confirmarEdicion}
                  onKeyDown={(e) => e.key === "Enter" && confirmarEdicion()}
                  autoFocus
                />
              ) : (
                <span
                  className={`texto-tarea ${tarea.completado ? "tachado" : ""}`}
                  onClick={() => empezarEdicion(tarea)}
                >
                  {tarea.texto}

                </span>
            )}
              <button
                className="boton-eliminar"
                onClick={() => eliminarTarea(tarea.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <section className="papelera">
          <div className="encabezado-papelera">
            <h2>Papelera</h2>
            <span className="contador-papelera">{tareas_eliminadas.length}</span>

            {tareas_eliminadas.length > 0 && (
              <button className="boton-vaciar" onClick={vaciarPapelera}>
                Vaciar
              </button>
            )}
          </div>

          {tareas_eliminadas.length === 0 ? (
            <p className="papelera-vacia">No has eliminado tareas.</p>
          ) : (
            <ul className="lista-papelera">
              {tareas_eliminadas.map((eliminada) => (
                <li key={eliminada.id} className="fila-eliminada">
                  <span className="texto-eliminado">{eliminada.texto}</span>
                  <span className="hora-eliminada">{eliminada.eliminadaEn}</span>
                  <button
                    className="boton-restaurar"
                    onClick={() => restaurarTarea(eliminada.id)}
                    title="Restaurar tarea"
                  >
                    ↺
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  );
}