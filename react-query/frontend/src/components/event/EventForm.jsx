import { useNavigate } from "react-router-dom";

const EventForm = () => {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/");
  };

  const submitEventData = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <form onSubmit={submitEventData}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input type="text" name="title" id="title" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input type="text" name="description" id="description" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="location" className="form-label">
          Location
        </label>
        <input type="text" name="location" id="location" className="form-control" />
      </div>
      <div className="mb-3">
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input type="date" name="date" id="date" className="form-control" />
          </div>
          <div className="col-md-6">
            <label htmlFor="time" className="form-label">
              Time
            </label>
            <input type="time" name="time" id="time" className="form-control" />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="eventImage" className="form-label">
          Event Image
        </label>
        <input type="file" name="eventImage" id="eventImage" className="form-control" />
      </div>
      <div className="mb-3">
        <div className="row">
          <div className="col-md-6">
            <button onClick={backToHome} type="button" className="btn btn-secondary w-100 m-1">
              Cancel
            </button>
          </div>
          <div className="col-md-6">
            <button type="submit" className="btn btn-danger w-100 m-1">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
