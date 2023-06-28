import React from "react";

export default function ListItems({ list }) {
  return list.map((item) => {
    return (
      <div key={item.id}>
        <h1>{item.type}</h1>
      </div>
    );
  });
}
