import NavigationBar from "./components/UI/NavigationBar";

import Home from "./components/Home";

export default function App() {
  const menu = [
    {
      id: "m1",
      title: "Sushi",
      desc: "Finest fish and veggies",
      price: 22.99,
    },
    {
      id: "m2",
      title: "Schnitzel",
      desc: "A German Specialty",
      price: 16.5,
    },
    {
      id: "m3",
      title: "Barbecue Burger",
      desc: "American, raw, meaty",
      price: 12.99,
    },
    {
      id: "m4",
      title: "Green Bowl",
      desc: "Healthy...and green...",
      price: 18.99,
    },
  ];
  return (
    <>
      <NavigationBar />
      <Home data={menu} />
    </>
  );
}
