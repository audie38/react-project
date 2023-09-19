import EventForm from "../event/EventForm";
import Card from "../ui/Card";

const EventAddEdit = () => {
  return (
    <div className="container my-5">
      <Card className="p-4">
        <EventForm />
      </Card>
    </div>
  );
};

export default EventAddEdit;
