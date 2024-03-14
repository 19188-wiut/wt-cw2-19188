const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/events.json");

async function getEvents() {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });
    return JSON.parse(data);
  } catch (error) {
    // If there's an error reading the file or parsing JSON, return an empty array
    return [];
  }
}

// forms rendering
exports.showAddEventForm = (req, res) => {
  res.render("addEvent", { title: "Add New Event" });
};

exports.showEditEventForm = async (req, res) => {
  const { id } = req.params;
  const events = await getEvents();
  const event = events.find((event) => event.id === parseInt(id));
  if (!event) {
    return res.status(404).send("Event not found");
  }
  res.render("editEvent", { title: "Edit Event", event });
};

// CRUD functions
exports.listEvents = async (req, res) => {
  const events = await getEvents();
  res.render("events", { title: "List of Events", events });
};

async function saveEvents(events) {
  const data = JSON.stringify(events, null, 2);
  await fs.writeFile(filePath, data);
}

exports.addEvent = async (req, res) => {
  const { name, date, description } = req.body;

  // Basic validation
  if (!name || !date || !description) {
    return res.status(400).render("addEvent", {
      title: "Add New Event",
      error: "All fields are required.",
      event: req.body,
    });
  }

  const events = await getEvents();
  let newId;
  if (events.length > 0) {
    // If the events array is not empty, increment the highest ID by 1
    newId = events[events.length - 1].id + 1;
  } else {
    // If the events array is empty, start IDs at 1
    newId = 1;
  }
  events.push({ id: newId, name, date, description });
  await saveEvents(events);
  res.redirect("/events");
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, date, description } = req.body;
  // Basic validation
  if (!name || !date || !description) {
    return res.status(400).render("editEvent", {
      title: "Edit Event",
      error: "All fields are required.",
      event: req.body,
    });
  }
  const events = await getEvents();
  const eventIndex = events.findIndex((event) => event.id === parseInt(id));
  if (eventIndex >= 0) {
    events[eventIndex] = { id: parseInt(id), name, date, description };
    await saveEvents(events);
    res.redirect("/events");
  } else {
    res.status(404).send("Event not found");
  }
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  const events = await getEvents();
  const eventIndex = events.findIndex((event) => event.id === parseInt(id));
  if (eventIndex >= 0) {
    events.splice(eventIndex, 1);
    await saveEvents(events);
    res.redirect("/events");
  } else {
    res.status(404).send("Event not found");
  }
};
