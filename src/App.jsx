import { useState, useEffect } from "react";
import { Tooltip } from "./Tooltip";
import { calculateDayIndex, formatMonthName } from "./utils";
import fondos from "./data_ff/fondos";

export default function App() {
  const mesesCompletos = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const daysPerMonth = 30; // Asumiendo 30 días por mes
  const totalDays = mesesCompletos.length * daysPerMonth;

  const [currentDayIndex, setCurrentDayIndex] = useState(null);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const today = new Date();
    const monthIndex = today.getMonth();
    const day = today.getDate();
    setCurrentDayIndex(monthIndex * daysPerMonth + (day - 1));
  }, []);

  const handleMouseEnter = (fondo, e) => {
    const rect = e.target.getBoundingClientRect();
    const tooltipLeft = rect.left + rect.width / 2 - 50;
    const tooltipTop = rect.top - 40;

    const [startDay, startMonth] = fondo.fechaInicio.split("-").map(Number);
    const [endDay, endMonth] = fondo.fechaCierre.split("-").map(Number);

    const formattedStartDate = `${startDay} de ${mesesCompletos[startMonth - 1]}`;
    const formattedEndDate = `${endDay} de ${mesesCompletos[endMonth - 1]}`;

    // Verificamos si el fondo comienza el 1 y termina el 30 del mes
    const monthsMessage = startDay === 1 && endDay === 30
      ? `El periodo es entre los meses de ${mesesCompletos[startMonth - 1]} y ${mesesCompletos[endMonth - 1]}`
      : `Inicio: ${formattedStartDate}, Fin: ${formattedEndDate}`;

    setTooltipPosition({ left: tooltipLeft, top: tooltipTop });
    setTooltipData({ message: monthsMessage });
  };

  const handleMouseLeave = () => {
    setTooltipData(null);
  };

  return (
    <div className="p-4 overflow-x-auto relative">
      <h1 className="text-2xl font-bold mb-4">Cronograma de Fondos Concursables</h1>

      {/* Cabecera */}
      <div className="grid" style={{ gridTemplateColumns: `200px repeat(${totalDays}, 3.6px)` }}>
        <div className="text-left px-2 font-semibold">Fondo Concursable</div>
        {mesesCompletos.map((mes, index) => (
          <div key={index} className="text-center font-semibold border-x" style={{ gridColumn: `span ${daysPerMonth}` }}>
            {mes}
          </div>
        ))}
      </div>

      {/* Cuerpo */}
      <div className="relative">
        {fondos.map((fondo, i) => {
          const startIndex = calculateDayIndex(fondo.fechaInicio);
          const endIndex = calculateDayIndex(fondo.fechaCierre);

          return (
            <div
              key={i}
              className="grid"
              style={{ gridTemplateColumns: `200px repeat(${totalDays}, 3.6px)` }}
              onMouseEnter={(e) => handleMouseEnter(fondo, e)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Nombre del fondo */}
              <div className="text-left px-2 border-b py-1 relative">
                <a href={fondo.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {fondo.nombre}
                </a>
              </div>

              {/* Días del fondo */}
              {Array.from({ length: totalDays }, (_, j) => (
                <DayCell 
                  key={j} 
                  isOccupied={j >= startIndex && j <= endIndex} 
                />
              ))}
            </div>
          );
        })}

        {/* Línea roja para la fecha actual */}
        {currentDayIndex !== null && (
          <div
            style={{ left: `${200 + currentDayIndex * 3.6}px` }}
            className="absolute top-0 bottom-0 w-[2px] bg-red-500 opacity-80"
          ></div>
        )}
      </div>

      {/* Tooltip */}
      <Tooltip message={tooltipData?.message} position={tooltipPosition} />
    </div>
  );
}

// Componente de Celda de Día
const DayCell = ({ isOccupied }) => {
  return (
    <div className={`h-6 border ${isOccupied ? "bg-green-500" : "bg-gray-50"}`}></div>
  );
};
