export const CHARACTER_IDS = [
  { id: 1009610, name: "Spider-Man" },
  { id: 1009368, name: "Iron Man" },
  { id: 1009220, name: "Captain America" },
  { id: 1009189, name: "Black Widow" },
  { id: 1009718, name: "Wolverine" },
  { id: 1009664, name: "Thor" },
  { id: 1009351, name: "Hulk" },
  { id: 1010338, name: "Captain Marvel" },
  { id: 1009268, name: "Deadpool" },
  { id: 1009282, name: "Doctor Strange" },
  { id: 1009662, name: "Thanos" },
  { id: 1009187, name: "Black Panther" },
  { id: 1009471, name: "Scarlet Witch" },
  { id: 1009707, name: "Vision" },
  { id: 1009297, name: "Falcon" },
  { id: 1009338, name: "Hawkeye" },
  { id: 1009362, name: "Human Torch" },
  { id: 1009243, name: "Daredevil" },
  { id: 1009262, name: "Deadpool" },
  { id: 1009356, name: "Iron Fist" },
  { id: 1009421, name: "Silver Surfer" },
  { id: 1009629, name: "Storm" },
  { id: 1009697, name: "Venom" },
  { id: 1009281, name: "Doctor Octopus" },
];

export function getTwoMonthRange(): string {
  const now = new Date();

  // fecha final = hoy
  const end = now.toISOString().split("T")[0]; // "2025-09-11"

  // fecha inicial = hace 2 meses
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 2);
  const start = startDate.toISOString().split("T")[0]; // "2025-07-11"

  return `${start},${end}`;
}

export function getRandomDates(): string {
  const year = 1990 + Math.floor(Math.random() * 10); // 1990-1999
  const dateRange = `${year}-01-01,${year}-12-31`;
  return dateRange
}

export function getRandomPastMonthDateRange(): string {
  const today = new Date();
  const year = today.getFullYear();
  const currentMonth = today.getMonth(); // 0 = enero, 11 = diciembre

  // Elegir un mes aleatorio anterior al actual
  const month = currentMonth === 0 ? 0 : Math.floor(Math.random() * currentMonth);

  // Primer y último día del mes elegido
  const startDate = `${year}-${String(month + 1).padStart(2, '0')}-01`;
  const endDate = `${year}-${String(month + 1).padStart(2, '0')}-${new Date(year, month + 1, 0).getDate()}`;

  return `${startDate},${endDate}`;
}
