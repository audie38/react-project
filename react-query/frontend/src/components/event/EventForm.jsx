import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useInput from "../../hooks/use-input";
import Alert from "../UI/Alert";
import Spinner from "../UI/Spinner";
import { Fragment, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

const EventForm = (props) => {
  const navigate = useNavigate();

  const eventsData = props?.existingData;

  let existingTitle = {
    value: eventsData?.title || "",
    isTouched: eventsData ? true : false,
  };
  let existingLocation = {
    value: eventsData?.location || "",
    isTouched: eventsData ? true : false,
  };
  let existingDate = {
    value: eventsData?.date || "",
    isTouched: eventsData ? true : false,
  };
  let existingTime = {
    value: eventsData?.time || "",
    isTouched: eventsData ? true : false,
  };

  const textValidation = (text) => {
    return text.trim() !== "";
  };

  const { value: title, error: titleInvalid, valid: titleIsValid, inputChangeHandler: onTitleChangeHandler, inputBlurHandler: onTitleBlurHandler, reset: resetTitle } = useInput(textValidation, existingTitle);
  const [description, setDescription] = useState(eventsData?.description || "");
  const { value: location, error: locationInvalid, valid: locationIsValid, inputChangeHandler: onLocationChangeHandler, inputBlurHandler: onLocationBlurHandler, reset: resetLocation } = useInput(textValidation, existingLocation);
  const { value: date, error: dateInvalid, valid: dateIsValid, inputChangeHandler: onDateChangeHandler, inputBlurHandler: onDateBlurHandler, reset: resetDate } = useInput(textValidation, existingDate);
  const { value: time, error: timeInvalid, valid: timeIsValid, inputChangeHandler: onTimeChangeHandler, inputBlurHandler: onTimeBlurHandler, reset: resetTime } = useInput(textValidation, existingTime);
  const [eventImage, setEventImage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const formValid = titleIsValid && locationIsValid && dateIsValid && timeIsValid;

  const setDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const setEventImageHandler = (event) => {
    setEventImage(event.target.files[0]);
  };

  const resetFields = () => {
    resetTitle();
    resetLocation();
    resetDate();
    resetTime();
  };

  const backToHome = () => {
    navigate("/");
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", eventImage);

    const response = await fetch(`${API_BASE_URL}/event/upload`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const responseData = await response.json();
    if (!response.ok) {
      const message = responseData?.message || "Failed to Upload";
      console.log("Error: ", message);
    }
    return responseData?.uploadedFile;
  };

  const sendRequest = async (data) => {
    const response = await fetch(`${API_BASE_URL}/event`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (!response.ok) {
      const message = responseData?.message || "Failed to Create Event";
      console.log("Error: ", message);
    }
  };

  const submitEventData = async (e) => {
    e.preventDefault();
    if (formValid) {
      if (confirm("Save Changes ? ")) {
        try {
          setSubmitLoading(true);
          const eventImageFileName = await uploadImage();
          const eventObj = {
            title,
            description,
            eventDate: date,
            eventTime: time,
            eventLocation: location,
            eventImage: eventImageFileName || "",
          };
          await sendRequest(eventObj);
          setSubmitLoading(false);
          resetFields();
        } catch (error) {
          setSubmitError(error);
          setSubmitLoading(false);
        }
      }
      navigate("/");
    }
  };

  return (
    <Fragment>
      {submitError && <Alert message={submitError} />}
      {submitLoading && !submitError && <Spinner />}
      <form onSubmit={submitEventData}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" name="title" id="title" className="form-control" value={title} disabled={submitLoading} onChange={onTitleChangeHandler} onBlur={onTitleBlurHandler} />
          {titleInvalid && <div className="form-text text-danger">Event Name Cannot be Empty</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea name="description" id="description" className="form-control" value={description} disabled={submitLoading} onChange={setDescriptionHandler}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input type="text" name="location" id="location" className="form-control" value={location} disabled={submitLoading} onChange={onLocationChangeHandler} onBlur={onLocationBlurHandler} />
          {locationInvalid && <div className="form-text text-danger">Event Location Cannot be Empty</div>}
        </div>
        <div className="mb-3">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input type="date" name="date" id="date" className="form-control" value={date} disabled={submitLoading} onChange={onDateChangeHandler} onBlur={onDateBlurHandler} />
              {dateInvalid && <div className="form-text text-danger">Event Date Cannot be Empty</div>}
            </div>
            <div className="col-md-6">
              <label htmlFor="time" className="form-label">
                Time
              </label>
              <input type="time" name="time" id="time" className="form-control" value={time} disabled={submitLoading} onChange={onTimeChangeHandler} onBlur={onTimeBlurHandler} />
              {timeInvalid && <div className="form-text text-danger">Event Time Cannot be Empty</div>}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="eventImage" className="form-label">
            Event Image
          </label>
          <input type="file" name="eventImage" id="eventImage" className="form-control" onChange={setEventImageHandler} />
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
    </Fragment>
  );
};

EventForm.propTypes = {
  existingData: PropTypes.object,
};

export default EventForm;
