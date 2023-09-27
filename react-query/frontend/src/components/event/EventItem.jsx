import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Card from "../UI/Card";
const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

const EventItem = (props) => {
  const event = props.data;
  return (
    <Link className="nav-link" to={`/event/${event.eventsId}`}>
      <Card>
        <img src={`${API_BASE_URL}/event/img/${event.eventImage}`} className="card-img-top img-fluid event-image" alt={event.title} />
        <div className="card-body">
          <h5 className="card-title">{event.title}</h5>
          <p className="card-text">
            {event.eventDate} @{event.eventTime.slice(0, -3)}
          </p>
        </div>
      </Card>
    </Link>
  );
};

EventItem.propTypes = {
  data: PropTypes.object.isRequired,
};

EventItem.defaultProps = {
  data: {},
};

export default EventItem;
