import React from "react";
import styles from "./List.module.scss";
import cn from "classnames";
import PropTypes from "prop-types";

const List = ({ clsMain, clsButton, items, value, onSet, onClear }) => {
  const isValue = Boolean(value);

  const changeHandler = ({ target }) => {
    const selected = target.options[target.options.selectedIndex];

    if (selected.value === "-1") {
      onClear();
    } else {
      onSet(selected.value, {
        obj: selected.dataset.obj && JSON.parse(selected.dataset.obj),
      });
    }
  };

  const clearHandler = ({ target }) => {
    target.previousElementSibling.selectedIndex = 0;
    onClear();
  };

  return (
    <div
      className={cn([clsMain, styles.table__cell_select])}
      style={{
        "--button-delete": isValue ? 1 : 0,
      }}
    >
      <select value={value} onChange={changeHandler}>
        <option value="-1">Выберите</option>
        {items.map((item, inx) => (
          <option key={inx} value={item.id} data-obj={JSON.stringify(item)}>
            {item.text}
          </option>
        ))}
      </select>

      {isValue ? (
        <i className={cn(["material-icons", clsButton])} onClick={clearHandler}>
          clear
        </i>
      ) : null}
    </div>
  );
};

List.defaultProps = {
  items: [],
  onSet: () => null,
  onClear: () => null,
};

List.propTypes = {
  clsMain: PropTypes.string,
  clsButton: PropTypes.string,
  items: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSet: PropTypes.func,
  onClear: PropTypes.func,
};

export default List;
