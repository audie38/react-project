import EventSearch from "../event/EventSearch";
import EventList from "../event/EventList";

const Event = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center my-5">
      <EventSearch />
      <EventList />
    </div>
  );
};

export default Event;
