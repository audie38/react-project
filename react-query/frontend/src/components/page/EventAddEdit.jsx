import EventForm from "../event/EventForm";
import Card from "../ui/Card";

const EventAddEdit = () => {
  return (
    <div className="container my-5 w-75">
      <Card className="px-5 py-3">
        <EventForm />
      </Card>
    </div>
  );
};

export default EventAddEdit;
