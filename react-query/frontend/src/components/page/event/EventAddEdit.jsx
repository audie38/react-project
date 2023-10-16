import EventForm from "../../event/EventForm";
import Card from "../../UI/Card";

const EventAddEdit = () => {
  return (
    <div className="container my-5">
      <Card className="p-4">
        <EventForm existingData={null} />
      </Card>
    </div>
  );
};

export default EventAddEdit;