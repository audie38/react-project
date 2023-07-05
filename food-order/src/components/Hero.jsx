import Card from "./UI/Card";

export default function Hero() {
  return (
    <header className="header">
      <div className="hero"></div>
      <div className="container d-flex flex-column align-items-center mt-5">
        <Card className={"w-75 hero-text text-center"}>
          <h1>Delicious Food, Delivered To You</h1>
          <p>Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.</p>
          <p>All our meals are cooked with high quality ingredients, just-in-time and of course by experienced chefs!</p>
        </Card>
      </div>
    </header>
  );
}
