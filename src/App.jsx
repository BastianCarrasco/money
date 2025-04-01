import { useState, useEffect } from "react";
import { Tooltip } from "./Tooltip";
import { calculateDayIndex } from "./utils";

export default function App() {
  const mesesCompletos = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const daysPerMonth = 30; // Asumiendo 30 días por mes
  const totalDays = mesesCompletos.length * daysPerMonth;

  const [fondos, setFondos] = useState([]); // Estado para almacenar los fondos
  const [currentDayIndex, setCurrentDayIndex] = useState(null);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Obtener la fecha actual
    const today = new Date();
    const monthIndex = today.getMonth();
    const day = today.getDate();
    setCurrentDayIndex(monthIndex * daysPerMonth + (day - 1));
    setCurrentDate(`${day} de ${mesesCompletos[monthIndex]} de ${today.getFullYear()}`);

    // Realizar el fetch para obtener los fondos
    const fetchFondos = async () => {
      try {
        const response = await fetch('https://backend-fechas.onrender.com/fechas');
        const data = await response.json();
        setFondos(data); // Almacenar los fondos en el estado
      } catch (error) {
        console.error('Error al obtener los fondos:', error);
      }
    };

    fetchFondos();
  }, []);

  const handleMouseEnter = (fondo, e) => {
    const rect = e.target.getBoundingClientRect();
    const tooltipLeft = rect.left + rect.width / 2 - 50;
    const tooltipTop = rect.top - 40;

    const [startDay, startMonth] = fondo.fechaInicio.split("-").map(Number);
    const [endDay, endMonth] = fondo.fechaCierre.split("-").map(Number);

    const formattedStartDate = `${startDay} de ${mesesCompletos[startMonth - 1]}`;
    const formattedEndDate = `${endDay} de ${mesesCompletos[endMonth - 1]}`;

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
    <div className="p-4 overflow-x-auto relative min-h-screen bg-gradient-to-b from-white-200 to-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Cronograma de Fondos Concursables</h1>
        <div className="text-lg font-semibold text-gray-700">{currentDate}</div>
      </div>

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
              <div className="text-left px-2 border-b py-1 relative">
                <a href={fondo.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {fondo.nombre}
                </a>
              </div>
              {Array.from({ length: totalDays }, (_, j) => (
                <DayCell key={j} isOccupied={j >= startIndex && j <= endIndex} />
              ))}
            </div>
          );
        })}

        {/* Línea roja para la fecha actual */}
        {currentDayIndex !== null && (
          <>
            <div
              style={{ left: `${200 + currentDayIndex * 3.6}px` }}
              className="absolute top-0 bottom-0 w-[2px] bg-red-500 opacity-80"
            ></div>

            {/* Fecha encima de la línea roja */}
            <div
              style={{
                left: `${180 + currentDayIndex * 3.6 - 15}px`,
                top: "-40px",
              }}
              className="absolute text-sm font-semibold text-red-500 bg-white px-1 rounded"
            >
              {new Date().toLocaleDateString("es-ES")}
            </div>
          </>
        )}
      </div>

      {/* Tooltip */}
      <Tooltip message={tooltipData?.message} position={tooltipPosition} />
    </div>
  );
}

const DayCell = ({ isOccupied }) => {
  return (
    <div className={`h-6 border ${isOccupied ? "bg-green-500" : "bg-gray-500"}`}></div>
  );
};
