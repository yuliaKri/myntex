import { Button } from 'react-bootstrap';
import "./App.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import Select from "./Select";
const routes = [
  {
    id: "RI",
    name: "Rio de Janeiro",
    abilityToFlyTo: ["New York City", "Chichen Itza", "Toronto"],
  },
  {
    id: "P",
    name: "Paris",
    abilityToFlyTo: ["Toronto", "Rome", "Moscow"],
  },
  {
    id: "NYC",
    name: "New York City",
    abilityToFlyTo: ["Calgary", "Kuala Lumpur"],
  },
  {
    id: "CGY",
    name: "Calgary",
    abilityToFlyTo: ["Chichen Itza", "Kuala Lumpur", "Toronto"],
  },
  {
    id: "CI",
    name: "Chichen Itza",
    abilityToFlyTo: ["Rio de Janeiro"],
  },
  {
    id: "K",
    name: "Kuala Lumpur",
    abilityToFlyTo: ["Moscow", "Rome", "Paris"],
  },

  {
    id: "M",
    name: "Moscow",
    abilityToFlyTo: ["Rome", "Toronto"],
  },
  {
    id: "RO",
    name: "Rome",
    abilityToFlyTo: ["Moscow", "Calgary"],
  },
  {
    id: "TO",
    name: "Toronto",
    abilityToFlyTo: ["New York City"],
  },
];

function App() {
  const [cityFrom, setCityFrom] = useState({});
  const [cityTo, setCityTo] = useState({});
  const [checkTime, setCheckTime] = useState(false);
  const [totalHours, setTotalHours] = useState(0);
  const [countF, setCountF] = useState(0);
  const timeToOneFlight = 1;
  const timeForCustom = 1;
  const bigArray = [];

  const handleSubmit = () => {
    bigArray.push(cityFrom.name);
    bigArray.push(cityFrom.abilityToFlyTo);
    let c = 1;
    while (c <= 10) {
      if (bigArray[c].find((val) => val === cityTo.name)) {
        break;
      }

      const newArr = [];

      for (let i = 0; i <= bigArray[c].length - 1; i++) {
        newArr.push(
            // eslint-disable-next-line
          ...routes.find((el) => el.name === bigArray[c][i]).abilityToFlyTo
        );
      }

      const filteredArr = newArr.filter((val) => val !== cityFrom.name);
      const uniqueArr = filteredArr.filter((v, i, a) => a.indexOf(v) === i);
      bigArray.push(uniqueArr);
      console.log(bigArray);
      if (uniqueArr.find((val) => val === cityTo.name)) {
        //*
        /*const lastPossibleVisitedCities = bigArray[c - 1];
        for (let j = 0; j <= lastPossibleVisitedCities.length - 1; j++) {
          if (lastPossibleVisitedCities?.find((el) => el === cityTo.name)) {
            const lastCity = lastPossibleVisitedCities[j];
            console.log(cityFrom,lastCity,cityTo)
          }
        }*/

        break;
      }
      c++;
    }
    setCountF((bigArray.length - 1) * timeToOneFlight);
    setTotalHours(
      (bigArray.length - 1) * timeToOneFlight +
        (bigArray.length - 2) * timeForCustom
    );
    setCheckTime(!checkTime);
  };

  const routesOptions = [];
  routes.map((el) => routesOptions.push({ value: el.id, label: el.name }));

  return (
    <div className="App">
      <Select
        id="cityFrom"
        options={routesOptions}
        placeholder="cityFrom"
        labelText="CITY FROM"
        onChange={(e) => {
          setCityFrom(routes.find((el) => el.id === e.target.value));
          setCheckTime(false);
        }}
        value={cityFrom.value}
      />

      <Select
        id="cityTo"
        options={routesOptions}
        placeholder="cityTo"
        labelText="CITY TO"
        onChange={(e) => {
          setCityTo(routes.find((el) => el.id === e.target.value));
          setCheckTime(false);
        }}
        value={cityTo.value}
      />
      <div style={{paddingTop: '20px'}}>
        <Button onClick={() => handleSubmit()}>Check the time</Button>
        {checkTime ? (
          <>
            <div style={{paddingTop: '20px'}}>
              Your journey will take {totalHours} hours ( consist from {countF} flights )
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
