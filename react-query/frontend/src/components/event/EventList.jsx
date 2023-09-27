import PropTypes from "prop-types";
import EventItem from "./EventItem";

const EventList = (props) => {
  return (
    <div className="row">
      {props.data.map((item) => (
        <div key={item.eventsId} className="col-md-4">
          <EventItem data={item} />
        </div>
      ))}
    </div>
  );
};

EventList.propTypes = {
  data: PropTypes.array.isRequired,
};

EventList.defaultProps = {
  data: [],
};

export default EventList;
