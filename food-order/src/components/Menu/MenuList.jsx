import PropTypes from "prop-types";
import MenuItem from "./MenuItem";

const MenuList = ({ data }) => {
  return (
    <div className="card p-3 rounded-4">
      {data.length > 0 && (
        <ul className="list-group list-group-flush">
          {data.map((item) => (
            <MenuItem key={item.id} menu={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

MenuList.propTypes = {
  data: PropTypes.array.isRequired,
};

MenuList.defaultProps = {
  data: [],
};

export default MenuList;
