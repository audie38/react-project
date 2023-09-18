const EventForm = () => {
  return (
    <form>
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
    </form>
  );
};

export default EventForm;
