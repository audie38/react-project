import CartButton from "../Cart/CartButton";
import classes from "./MainHeader.module.css";

import { useDispatch } from "react-redux";
import { productActions } from "../../store/product";

const MainHeader = () => {
  const dispatch = useDispatch();
  const navigateToHome = () => {
    dispatch(productActions.hideCart());
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
