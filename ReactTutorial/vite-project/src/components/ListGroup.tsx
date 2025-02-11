// import { MouseEvent } from "react";

import { useState } from "react";
interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  // arr[0] = 1; // variable
  // arr[1](1); // updater function

  //event handler
  // const handleClick = (event: MouseEvent) => console.log(event)

  return (
    <div>
      <h1>{heading}</h1>
      {/* {items.length === 0 ? "No items" : null} */}
      {items.length === 0 && <p>No items</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            // onClick={handleClick}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListGroup;
