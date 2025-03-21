import { useState } from "react";
import fondos from "./data_ff/fondos";
import dataFondos from "./data_ff/periodos";

export default function App() {
  const meses = [
    "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Cada mes tendrá 4 subdivisiones, totalizando 44 columnas
  const totalDivisiones = 44;

  // Estado para controlar la visibilidad del tooltip
  const [tooltip, setTooltip] = useState(null);

  const handleMouseEnter = (fondo) => {
    setTooltip(fondo);
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Cronograma de Fondos Concursables</h1>
      
      <div className="grid grid-cols-[200px_repeat(44,minmax(15px,1fr))] gap-1 text-sm font-semibold border-b pb-2">
        <div className="text-left px-2">Fondo Concursable</div>
        {meses.map((mes, index) => (
          <div key={index} className="col-span-4 text-center border-x px-1">{mes}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-[200px_repeat(44,minmax(15px,1fr))] gap-1 relative">
        {fondos.map((fondo, i) => (
          <div key={i} className="contents">
            <div className="text-left px-2 border-b py-1">
              {/* Enlace al fondo con el tooltip al pasar el mouse */}
              <a
                href={fondo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
                onMouseEnter={() => handleMouseEnter(fondo)}
                onMouseLeave={handleMouseLeave}
              >
                {fondo.nombre}
              </a>

              {/* Mostrar el tooltip con la información cuando el mouse esté sobre el enlace */}
              {tooltip === fondo && (
                <div className="absolute bg-white border p-3 shadow-lg mt-2 rounded-lg transition-all opacity-90 max-w-xs z-10">
                  <table className="text-sm">
                    <tbody>
                      <tr>
                        <td className="font-bold pr-2">Fondo Concursable:</td>
                        <td>{fondo.nombre}</td>
                      </tr>
                      <tr>
                        <td className="font-bold pr-2">Fecha Inicio:</td>
                        <td>{fondo.fechaInicio}</td>
                      </tr>
                      <tr>
                        <td className="font-bold pr-2">Fecha Cierre:</td>
                        <td>{fondo.fechaCierre}</td>
                      </tr>
                      <tr>
                        <td className="font-bold pr-2">Plataforma:</td>
                        <td>{fondo.plataforma}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {[...Array(totalDivisiones)].map((_, j) => (
              <div
                key={j}
                className={`h-6 rounded border ${dataFondos[fondo.nombre]?.some(([start, end]) => j + 1 >= start && j + 1 <= end) ? 'bg-green-500' : 'bg-gray-200'}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
