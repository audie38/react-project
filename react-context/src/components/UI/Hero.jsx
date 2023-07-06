import Card from "./Card";
import "./Hero.css";

export default function Hero() {
  return (
    <>
      <div className="hero d-flex justify-content-center align-items-center position-relative mb-5">
        <Card className={"w-50 bg-dark text-light text-center top-50"}>
          <h1 className="h1">Delicious Food, Delivered To You</h1>
          <p>Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.</p>
          <p>All our meals are cooked with high-quality ingredients, just-in-time and of course by experienced chefs!</p>
        </Card>
      </div>
    </>
  );
}
