import React, { useState, useEffect } from "react";
import "./style/CreateType.css";
import MaterialTable from "material-table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@material-ui/core";

const CreateType = () => {
  const [posiljalac, setPosiljalac] = useState("");
  const [uzorakid, setUzorakId] = useState(0);
  const [rezultatid, setRezultatid] = useState(0);
  const [tipovi, setTipovi] = React.useState([]);
  const [rezultati, setRezultati] = React.useState([]);
  const [datumupisa, setDatumupisa] = useState(new Date());
  const [rezultatBrisanje, setRezultatBrisanje] = useState([]);

  const sendRez = async () => {
    var e = document.getElementById("uz");
    var uzorakid = e.options[e.selectedIndex].value;
    const rezObj = {
      posiljalac: posiljalac,
      datumupisa: datumupisa,
      uzorakid: uzorakid,
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

  const [columns, setColumns] = useState([
    { title: "RezultatID", field: "rezultatid" },
    { title: "Posiljalac", field: "posiljalac" },
    { title: "Datum upisa", field: "datumupisa" },
    { title: "UzorakID", field: "uzorakid" },
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

  const onRowAdd = () => {
    console.log("add");
  };
  const onRowUpdate = () => {
    console.log("up");
  };
  const onRowDelete = () => {
    console.log("del");
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
          <input
            type="text"
            id="posiljalac"
            value={posiljalac}
            onChange={(e) => setPosiljalac(e.target.value)}
          />
          {/* <label>Ime i prezime pacijenta: </label> */}
          <select id="uz">{renderTipovi()}</select>
          {/* <label>Datum upisa:</label> */}
          <DatePicker
            selected={datumupisa}
            onChange={(datumupisa) => setDatumupisa(datumupisa)}
            dateFormat="yyyy-MM-dd"
          />
          {/* <DatePicker selected={startDate} onChange={date => setStartDate(date)} setOpen={true}/> */}
          <div className="buttonsEdit">
            <button
              className="myButton"
              onClick={() => sendRez({ posiljalac, datumupisa, uzorakid })}
            >
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
        onRowSelected={(event, rowData) => console.log(rowData)}
        editable={{
          isEditable: (rowData) => true,
          isDeletable: (rowData) => true,
          onRowAdd: onRowAdd,
          onRowUpdate: onRowUpdate,
          onRowDelete: onRowDelete,
        }}
      />
    </div>
  );
};

export default CreateType;
