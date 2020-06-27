import React, { useState, useEffect } from "react";
import "./style/CreateType.css";
import MaterialTable from "material-table";
import DatePicker from "react-datepicker";
import { Button } from "@material-ui/core";

const CreateType = () => {
  const [posiljalac, setPosiljalac] = useState("");
  const [datumUpisa, setDatumUpisa] = useState(null);
  const [uzorakid, setUzorakId] = useState();
  const [tipovi, setTipovi] = React.useState([]);
  const [rezultati,setRezultati] = React.useState([]);

  const sendRez = async () => {
    const rezObj = {
      posiljalac: posiljalac,
      datumUpisa: datumUpisa,
      uzorakid: 2,
    };
    fetch("http://localhost:9000/addrezultat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rezObj),
    })
      .then(async (res) => {
        if (res.status == 400) {
          return res.json();

        }
        if (res.ok) {
          console.log(res);
          console.log("SUCCESS");
        } else {
          console.log(res);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };


  const [dummyRez, setDummyRez] = useState([
    {
      posiljalac: "AquaLab",
      datumUpisa: "2020-06-11",
    },
    {
      posiljalac: "BelMedic",
      datumUpisa: "2020-06-12",
    },
  ]);
  const [columns, setColumns] = useState([
    { title: "Posiljalac", field: "posiljalac" },
    { title: "Datum upisa", field: "datumUpisa" },
  ]);
 

  const getTipovi = () => {
    fetch("http://localhost:9000/uzorci")
      .then((response) => response.json())
      .then((response) => setTipovi(response))
      .catch((err) => console.error(err));
  };

  const getRezultati = () => {
    fetch("http://localhost:9000/rezultati")
      .then((response) => response.json())
      .then((response) => setRezultati(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTipovi();
    getRezultati();
  }, []);

  const renderTipovi = () => {
    if (tipovi) {
      console.log(tipovi);
      return tipovi.map((tip, index) => {
        return (
          <option key={index + "|"} value={tip.uzorakid}>
            {tip.ime + " " + tip.prezime}
          </option>
        );

        // return <MenuItem key={index + "|"} value={tip.naziv} >{tip.naziv}</MenuItem>
      });
    } else {
      return <option>test</option>;
    }
  };
  return (
    <div>
      <form className="form-create-type">
        <div className="div-form">
          {/* <label htmlFor="naziv">Naziv:</label> */}
          {/* da dobijes svoje umesto TesxtField samo input i otkomentarisi labels*/}
          {/* <label>Posiljalac: </label> */}
          <input
            type="text"
            id="posiljalac"
            value={posiljalac}
            onChange={(e) => setPosiljalac(e.target.value)}
          />
          {/* <label>Ime i prezime pacijenta: </label> */}
          <select name="cars">{renderTipovi()}</select>
          {/* <label>Datum upisa:</label> */}
          <DatePicker
            selected={new Date()}
            onChange={(datum) => setDatumUpisa(datum)}
            dateFormat="yyyy-MM-dd"
            dropdownMode="select"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
          />
          <div className="buttonsEdit">
            <button className="myButton" onClick={() => sendRez({posiljalac,datumUpisa,uzorakid})}>
              Dodaj
            </button>
            <button className="myButton">Izmeni</button>
            <button className="myButton">Obriši</button>
          </div>
        </div>
      </form>
      <MaterialTable
        columns={columns}
        data={rezultati}
        options={{
          selection: true,
        }}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Save Rez',
            onClick: (event, rowData) => alert("You saved " + rowData.name)
          },
          {
            icon: 'delete',
            tooltip: 'Delete Rez'
          }
        ]}
      />
    </div>
  );
};

export default CreateType;
