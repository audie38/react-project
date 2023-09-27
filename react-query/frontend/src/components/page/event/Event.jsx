import EventSearch from "../../event/EventSearch";
import EventList from "../../event/EventList";
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

const Event = () => {
  const [eventData, setEventData] = useState([]);

  const setEventDataHandler = (events) => {
    setEventData(events);
  };

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch(`${API_BASE_URL}/event`);
      if (!response.ok) {
        setEventData([]);
      }

      const responseData = await response.json();
      return responseData.data;
    }

    fetchEvents()
      .then((eventData) => setEventData(eventData))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-center my-5">
        <EventSearch onSearch={setEventDataHandler} />
      </div>
      <EventList data={eventData} />
    </div>
  );
};

export default Event;
