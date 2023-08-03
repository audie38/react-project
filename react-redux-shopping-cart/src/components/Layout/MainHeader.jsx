import CartButton from "../Cart/CartButton";
import classes from "./MainHeader.module.css";

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";

const MainHeader = () => {
  const dispatch = useDispatch();
  const navigateToHome = () => {
    dispatch(cartActions.hideCart());
  };
  return (
    <header className={classes.header}>
      <h1 onClick={navigateToHome} style={{ cursor: "pointer" }}>
        ReduxCart
      </h1>
      <nav>
        <ul>
          <li>
            <CartButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
