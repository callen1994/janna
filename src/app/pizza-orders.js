import React from "react";

function PizzaOrder(props) {
  return (
    <div style={{ margin: "1em" }}>
      <div>Size: {props.pizza.size}</div>
      <div>Topping: {props.pizza.topping}</div>
    </div>
  );
}

function pizzaOrders(props) {
  return props.pizzas.map((p, i) => <PizzaOrder key={i} pizza={p} />);
}

export default pizzaOrders;
