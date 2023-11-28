import { useEffect, useState } from "react";
import "../../assets/styles/Event_Create/Event_Creation_Page.css";
import Event_List from "../Event_Listing/Event_Listing_Page";

function Event_Creation_Page() {
  const storedeventValues = JSON.parse(localStorage.getItem("eventValues")) || [
    {
      id: 1,
      event_name: "Birthday",
      event_start_date: "Tue 28 Nov",
      event_end_date: "Wed 29 Nov",
      event_start_time: "7:00 PM",
      event_end_time: "8:00 PM",
    },
  ];

  const [eventValues, seteventValues] = useState(storedeventValues);

  const [inputValues, setinputValues] = useState([{}]);

  useEffect(() => {
    localStorage.setItem("eventValues", JSON.stringify(eventValues));

    const d = new Date();
    document
      .querySelector(".event-start-date")
      .setAttribute(
        "min",
        `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
      );
    document
      .querySelector(".event-end-date")
      .setAttribute(
        "min",
        `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
      );
  }, [eventValues]);

  function handleChange(value, type) {
    var date, day, month, stringDate;
    if (type === "event-name") {
      setinputValues({ ...inputValues, event_name: value });
    } else if (type == "event-start-date") {
      const d = new Date(value);
      document
        .querySelector(".event-start-date")
        .addEventListener("change", (event) => {
          event.target.type = "text";
          date = d.getDate();
          day = d.toLocaleDateString("en-US", {
            weekday: "long",
          });
          month = d
            .toLocaleDateString("en-US", {
              month: "long",
            })
            .slice(0, 3);
          calendarIcon(type, [d.getDate(), month]);
          stringDate = `${day.slice(0, 3)} ${date} ${month}`;
          event.target.value = `${day.slice(0, 3)}, ${date} ${month}`;
          setinputValues({
            ...inputValues,
            event_start_date: stringDate,
          });
        });
      document
        .querySelector(".event-start-date")
        .addEventListener("click", (event) => {
          event.target.type = "date";
          event.target.value = value;
        });
    } else if (type == "event-end-date") {
      const d = new Date(value);
      document
        .querySelector(".event-end-date")
        .addEventListener("change", (event) => {
          event.target.type = "text";
          date = d.getDate();
          day = d.toLocaleDateString("en-US", {
            weekday: "long",
          });
          month = d
            .toLocaleDateString("en-US", {
              month: "long",
            })
            .slice(0, 3);
          calendarIcon(type, [d.getDate(), month]);
          stringDate = `${day.slice(0, 3)} ${date} ${month}`;
          event.target.value = `${day.slice(0, 3)}, ${date} ${month}`;
          setinputValues({
            ...inputValues,
            event_end_date: stringDate,
          });
        });
      document
        .querySelector(".event-end-date")
        .addEventListener("click", (event) => {
          event.target.type = "date";
          event.target.value = value;
        });
    } else if (type == "event-start-time") {
      document
        .querySelector(".event-start-time")
        .addEventListener("change", (event) => {
          event.target.type = "text";
          event.target.value = new Date(
            "1970-01-01T" + value + "Z"
          ).toLocaleTimeString("en-US", {
            timeZone: "UTC",
            hour12: true,
            hour: "numeric",
            minute: "numeric",
          });
          setinputValues({
            ...inputValues,
            event_start_time: event.target.value,
          });
        });
      document
        .querySelector(".event-start-time")
        .addEventListener("click", (event) => {
          event.target.type = "time";
          event.target.value = value;
        });
    } else if (type == "event-end-time") {
      document
        .querySelector(".event-end-time")
        .addEventListener("change", (event) => {
          event.target.type = "text";
          event.target.value = new Date(
            "1970-01-01T" + value + "Z"
          ).toLocaleTimeString("en-US", {
            timeZone: "UTC",
            hour12: true,
            hour: "numeric",
            minute: "numeric",
          });
          setinputValues({
            ...inputValues,
            event_end_time: event.target.value,
          });
        });
      document
        .querySelector(".event-end-time")
        .addEventListener("click", (event) => {
          event.target.type = "time";
          event.target.value = value;
        });
    }
  }

  function calendarIcon(type, value) {
    if (type === "event-start-date") {
      document.querySelector(".start-month").innerHTML = value[1];
      document.querySelector(".start-date").innerHTML = value[0];
    } else if (type === "event-end-date") {
      document.querySelector(".end-month").innerHTML = value[1];
      document.querySelector(".end-date").innerHTML = value[0];
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const neweventValues = {
      id: eventValues.length + 1,
      event_name: `${inputValues.event_name}`,
      event_start_date: `${inputValues.event_start_date}`,
      event_end_date: `${inputValues.event_end_date}`,
      event_start_time: `${inputValues.event_start_time}`,
      event_end_time: `${inputValues.event_end_time}`,
    };
    seteventValues([...eventValues, neweventValues]);
    clearValues();
  }

  function clearValues() {
    document.querySelector(".event-start-date").value = "";
    document.querySelector(".event-start-date").type = "date";
    document.querySelector(".event-end-date").value = "";
    document.querySelector(".event-end-date").type = "date";
    document.querySelector(".event-start-time").value = "";
    document.querySelector(".event-start-time").type = "time";
    document.querySelector(".event-end-time").value = "";
    document.querySelector(".event-end-time").type = "time";
    document.querySelector(".start-month").innerHTML = "";
    document.querySelector(".end-month").innerHTML = "";
    document.querySelector(".start-date").innerHTML = "";
    document.querySelector(".end-date").innerHTML = "";
  }

  function deleteEvent(id) {
    seteventValues((events) => events.filter((event_id) => event_id.id !== id));
  }

  return (
    <>
      <div className="container">
        <div className="event-page-form">
          <form className="event-form" onSubmit={(e) => handleSubmit(e)}>
            <input
              className="event-name"
              placeholder="Event Name"
              required
              onChange={(e) => handleChange(e.target.value, "event-name")}
            ></input>
            <div className="input-start">
              <div className="calendar-icons">
                <div className="start-month month-icon"></div>
                <div className="start-date date-icon"></div>
              </div>
              <div className="input-containers">
                <label>Start</label>
                <input
                  className="date event-start-date"
                  type="date"
                  required
                  onChange={(e) =>
                    handleChange(e.target.value, "event-start-date")
                  }
                ></input>
                <input
                  className="date event-start-time"
                  type="time"
                  required
                  onChange={(e) =>
                    handleChange(e.target.value, "event-start-time")
                  }
                ></input>
              </div>
            </div>
            <div className="input-end">
              <div className="calendar-icons">
                <div className="end-month month-icon"></div>
                <div className="end-date date-icon"></div>
              </div>
              <div className="input-containers">
                <label>End</label>
                <input
                  className="date event-end-date"
                  type="date"
                  required
                  onChange={(e) =>
                    handleChange(e.target.value, "event-end-date")
                  }
                ></input>
                <input
                  className="date event-end-time"
                  type="time"
                  required
                  onChange={(e) =>
                    handleChange(e.target.value, "event-end-time")
                  }
                ></input>
              </div>
            </div>
            <button type="submit" className="add-event">
              Create Event
            </button>
          </form>
        </div>
        <Event_List eventValues={eventValues} deleteEvent={deleteEvent} />
      </div>
    </>
  );
}

export default Event_Creation_Page;
