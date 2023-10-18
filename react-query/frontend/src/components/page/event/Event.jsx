import EventSearch from "../../event/EventSearch";
import EventList from "../../event/EventList";

import Spinner from "../../UI/Spinner";
import Alert from "../../UI/Alert";

import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

const Event = () => {
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const setEventDataHandler = (events) => {
    setEventData(events);
  };

  const setErrorHandler = (err) => {
    setError(err);
  };

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/event`);
      if (!response.ok) {
        setEventData([]);
        setErrorHandler(response?.message || "Failed to Fetch Events Data");
      }

      const responseData = await response.json();
      setIsLoading(false);
      return responseData?.data;
    }

    fetchEvents()
      .then((eventData) => setEventData(eventData))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      {error && <Alert message={error} />}
      <div className="d-flex justify-content-center my-5">
        <EventSearch onSearch={setEventDataHandler} />
      </div>
      {isLoading && !error ? <Spinner /> : <EventList data={eventData} />}
    </div>
  );
};

export default Event;
