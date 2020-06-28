import React, { useState, useEffect } from "react";
import "./style/CreateReport.css";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateReport = () => {
  const [age, setAge] = React.useState("");
  const [doktori, setDoktori] = React.useState([]);
  const [parametri, setParametri] = React.useState([]);
  const [datumst, setDatumSt] = useState(new Date());
  const [napomena, setNapomena] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  useEffect(() => {
    getDoktori();
    getParametri();
  }, []);

  const getDoktori = () => {
    fetch("http://localhost:9000/doktori")
      .then((response) => response.json())
      .then((response) => setDoktori(response))
      .catch((err) => console.error(err));
  };

  const getParametri = () => {
    fetch("http://localhost:9000/parametri")
      .then((response) => response.json())
      .then((response) => setParametri(response))
      .catch((err) => console.error(err));
  };

  const renderDoktori = () => {
    if (doktori) {
      console.log(doktori);
      return doktori.map((doktor, index) => {
        return (
          <option key={index + "|"} value={doktor.doktorid}>
            {doktor.ime + " " + doktor.prezime}
          </option>
        );
      });
    } else {
      return <option>test</option>;
    }
  };
  const renderParametri = () => {
    if (parametri) {
      console.log(parametri);
      return parametri.map((parametar, index) => {
        return (
          <option key={index + "|"} value={parametar.parametarid}>
            {parametar.naziv}
          </option>
        );
      });
    } else {
      return <option>test</option>;
    }
  };
  const [paramid,setParamid]=useState(0);
  const [naziv, setNaziv] = useState("");
  const [rezp, setRezP] = useState("");
  const [indikator, setIndikator] = useState("");
  const [rf, setRf] = useState("");
  const [jd, setJd] = useState("");
  const [dummyReports, setDummyReports] = useState([]);
  const [stavkeIzv, setStavkeIzv] = useState([]);
  const [columns, setColums] = useState([
    {title: "ParametarID",field:"paramid"},
    { title: "Naziv", field: "naziv" },
    { title: "Rezultat", field: "rezp" },
    { title: "Indikator", field: "indikator" },
    { title: "Ref vrednosti", field: "rf" },
    { title: "Jedinica", field: "jd" },
    
  ]);

  const sendIzvestaj = async () => {
    var e = document.getElementById("dokt");
    var doktorid = e.options[e.selectedIndex].value;
    var p = document.getElementById("param");
    var parametarid = e.options[e.selectedIndex].value;
    for(i=0;i<dummyReports.length;i++){
      stavkeIzvestaja:[
        {
          izvestajid: 2,
          kartonid: 1,
          rb: 1,
          indikator: dummyReports[i].indikator,
          rezultatparametra: dummyReports[i].rezp,
          parametarid: dummyReports[i].paramid,
          status: "dodavanje"
        },
      ]
    };
      const rezObj = {
        kartonid: 1,
        datumst: datumst,
        napomena: napomena,
        doktorid: doktorid,
        rezultatid: 3,
        stavke: 
      
    }
    
    fetch("http://localhost:9000/dodajizvestaj", {
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

  const updateDummyReports = (e) => {
    e.preventDefault();
    var e = document.getElementById("param");
    var nazivP = e.options[e.selectedIndex].text;
    var paramid = e.options[e.selectedIndex].value;
    var ref = e.options[e.selectedIndex].value;
    var jed = e.options[e.selectedIndex].value;
    setDummyReports([
      ...dummyReports,
      {
        paramid:paramid,
        naziv: nazivP,
        rezp: rezp,
        indikator: indikator,
        rf: ref,
        jd: jed,
      },
    ]);
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
  console.log(dummyReports);

  return (
    <div>
      <form className="form-create-report">
        <div className="div-form-report2 form-row">
          <div className="form-group col-md-2">
            <label className="col-form-label">Ime i prezime:</label>
            <input
              type="text"
              className="form-control"
              id="imeprezime"
              placeholder="imeprezime"
              value="nesto"
              disabled
            />
          </div>
          <div className="form-group col-sm-2">
            <label className="col-form-label">Datum rodjenja:</label>
            <input
              type="text"
              className="form-control"
              id="datumRodjenja"
              placeholder="datumRodjenja"
              value="nesto"
              disabled
            />
          </div>
          <div className="form-group col-sm-2">
            <label className="col-form-label">Pol:</label>
            <input
              type="text"
              className="form-control"
              id="pol"
              placeholder="pol"
              value="nesto"
              disabled
            />
          </div>
          {/*OVO SKLONITI?? */}
          <div className="form-group col-md-2">
            <label className="col-form-label">KartonID:</label>
            <input
              type="text"
              className="form-control"
              id="kartonid"
              placeholder="kartonid"
              value="nesto"
              disabled
            />
          </div>
          <div className="form-group col-md-2">
            <label classsName="col-form-label">RezultatID:</label>
            <input
              type="text"
              id="rezultatid"
              placeholder="rezultatid"
              className="form-control"
              value="nesto"
              disabled
            />
          </div>
          <div className="form-group col-md-2">
            <label className="col-form-label">Broj uzorka:</label>
            <input
              type="text"
              id="brojuzorka"
              placeholder="brojuzorka"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-row div-form-report">
          {/* <label htmlFor="naziv">Naziv:</label> */}
          {/* da dobijes svoje umesto TesxtField samo input i otkomentarisi labels*/}

          {/*doktor*/}
          <div className="form-group col-md-4">
            <label className="col-form-label">Doktor:</label>
            <select
              className="custom-select form-control"
              id="dokt"
              name="dokt"
            >
              {renderDoktori()}
            </select>
          </div>
          <div className="form-group col-md-4">
            <label className="col-form-label">Napomena:</label>
            <input
              type="text"
              className="form-control"
              id="napomena"
              placeholder="napomena"
              onChange={(e) => setNapomena(e.target.value)}
            />
          </div>
          <div className="form-group col-md-4">
            <label className="col-form-label">Datum:</label>
            <DatePicker
              className="form-control"
              selected={datumst}
              onChange={(datumst) => setDatumSt(datumst)}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>

        {/* JEL ID ZA UPRAVLJANJE ILI ZA CSS*/}

        {/*parametar*/}

        <div className="form-row div-form-report">
          <div className="form-group col-md-4">
            <label className="col-form-label">Parametar:</label>
            <select
              className="custom-select form-control"
              id="param"
              name="param"
            >
              {renderParametri()}
            </select>
          </div>
          <div className="form-group col-md-4">
            <label className="col-form-label">Rezultat:</label>
            <input
              type="text"
              className="form-control"
              id="rezultat"
              placeholder="rezultat"
              onChange={(e) => setRezP(e.target.value)}
            />
          </div>
          <div className="form-group col-md-4">
            <label className="col-form-label">Indikator:</label>
            <input
              type="text"
              className="form-control"
              id="indikator"
              placeholder="indikator"
              onChange={(e) => setIndikator(e.target.value)}
            />
          </div>
        </div>
        <button className="myButton" onClick={updateDummyReports}>
          Dodaj
        </button>
        <button className="myButton" onClick={sendIzvestaj}>
          Sačuvaj
        </button>
      </form>
      <div>
        <MaterialTable
          columns={columns}
          data={dummyReports}
          options={{
            selection: true,
          }}
          editable={{
            isDeletable: (rowData) => true,

            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...dummyReports];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setDummyReports([...dataDelete]);

                  resolve();
                }, 1000);
              }),
          }}
        />
      </div>
    </div>
  );
};

export default CreateReport;
