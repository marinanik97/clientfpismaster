import React, { useState, useEffect } from "react";
import "./style/CreateType.css";

const Card = (navigation) => {
  const [cards, setCards] = React.useState([]);

 

  const getCards = () => {
    fetch("http://localhost:9000/kartoni")
      .then((response) => response.json())
      .then((response) => setCards(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCards();
  }, []);

  const renderCards = () => {
    if (cards) {
      console.log(cards);
      return cards.map((card, index) => {
        return (
          <option key={index + "|"} value={card.kartonid}>
            {card.ime + " " + card.prezime}
          </option>
        );
      });
    } else {
      return <option>test</option>;
    }
  };

  console.log(cards);

  return (
    <div>
      <form className="form-create-type">
        <div className="div-form">
          <select id="cars" name="cars">
            {renderCards()}
          </select>
          <button className="myButton">Dalje</button>
        </div>
      </form>
      
    </div>
  );
};

export default Card;
