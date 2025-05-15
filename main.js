document.addEventListener("DOMContentLoaded", () => {
  const popularList = document.getElementById("popular-list");
  const customList = document.getElementById("custom-list");
  const form = document.getElementById("event-form");
  const errorMsg = document.getElementById("error-msg");

  const renderCountdown = (container, event) => {
    const div = document.createElement("div");
    div.className = "event-card";
    const title = document.createElement("h3");
    title.textContent = event.name;
    const timer = document.createElement("p");

    div.appendChild(title);
    div.appendChild(timer);
    container.appendChild(div);

    const update = () => {
      const now = new Date().getTime();
      const countDownDate = new Date(event.date).getTime();
      const distance = countDownDate - now;

      if (distance <= 0) {
        timer.textContent = "🎉 It's here!";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      timer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    update();
    setInterval(update, 1000);
  };

  const loadAllEvents = () => {
    popularList.innerHTML = "";
    customList.innerHTML = "";

    const allEvents = loadEvents();
    allEvents.forEach(event => {
      const target = predefinedEvents.some(e => e.name === event.name) ? popularList : customList;
      renderCountdown(target, event);
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("event-name").value.trim();
    const date = document.getElementById("event-date").value;

    if (!name || !date) {
      errorMsg.textContent = "Please fill out both fields.";
      return;
    }

    const now = new Date();
    const inputDate = new Date(date);

    if (inputDate <= now) {
      errorMsg.textContent = "Date must be in the future.";
      return;
    }

    errorMsg.textContent = "";
    const newEvent = { name, date };
    saveEvent(newEvent);
    form.reset();
    loadAllEvents();
  });

  loadAllEvents();
});
