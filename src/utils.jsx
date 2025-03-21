export const calculateDayIndex = (dateString) => {
    const [day, month] = dateString.split("-").map(Number);
    const daysPerMonth = 30;
    return (month - 1) * daysPerMonth + (day - 1);
  };
  
  export const formatMonthName = (month) => {
    const mesesCompletos = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return mesesCompletos[month - 1];
  };
  