const predefinedEvents = [
  { name: "New Year", date: "2026-01-01" },
  { name: "Christmas", date: "2025-12-25" },
  { name: "Diwali", date: "2025-10-20" }
];

const getStoredEvents = () => {
  const events = localStorage.getItem("customEvents");
  return events ? JSON.parse(events) : [];
};

const saveEvent = (event) => {
  const events = getStoredEvents();
  events.push(event);
  localStorage.setItem("customEvents", JSON.stringify(events));
};

const loadEvents = () => {
  return [...predefinedEvents, ...getStoredEvents()];
};
