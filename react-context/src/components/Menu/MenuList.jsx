import PropTypes from "prop-types";

import Card from "../UI/Card";
import MenuItem from "./MenuItem";

const MenuList = ({ data, onAdd }) => {
  return (
    <div className="container my-5">
      <Card>
        <ul className="list-group list-group-flush">{data.length > 0 && data.map((item) => <MenuItem key={item.id} data={item} onAdd={onAdd} />)}</ul>
      </Card>
    </div>
  );
};

MenuList.propTypes = {
  data: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default MenuList;
