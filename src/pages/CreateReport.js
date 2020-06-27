import React, { useState } from "react";
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

const styles = (theme) => ({
  input: {
    height: 40,
    width: 200,
    margin: "5px",
  },
  button: {
    height: 40,
  },
  selectRoot: {
    height: 40,
    display: "table",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
  select: {
    height: 40,
    paddingTop: 0,
    paddingBottom: 0,
    display: "table-cell",
    verticalAlign: "middle",
  },
});
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
    width: 200,
    height: 40,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const CreateReport = withStyles(styles)((props) => {
  const { classes } = props;
  const doktori = [
    { imePrezime: "Mika Mikic", godine: 32 },
    { imePrezime: "Miloje Milic", godine: 43 },
    { imePrezime: "Ivana Ivic", godine: 51 },
  ];
  const dummyReport = [
    {
      rezultatid: 1,
      brojuzorka: 1,
      ime: "Milica Milic",
      datum: "12-01-1996",
      pol: "Z",
      kartonid: "1",
    },
  ];

  const classesStyle = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [naziv, setNaziv] = useState("");
  const [rezultat, setRezultat] = useState("");
  const [indikator, setIndikator] = useState("");
  const [rf, setRf] = useState("");
  const [jd, setJd] = useState("");
  const [dummyReports, setDummyReports] = useState([
    {
      naziv: "Urin",
      rezultat: "nalazUrina",
      indikator: "nn",
      rf: "12",
      jd: "ml",
    },
    {
      naziv: "Urin",
      rezultat: "nalazUrina",
      indikator: "nn",
      rf: "12",
      jd: "ml",
    },
  ]);
  const [columns, setColums] = useState([
    { title: "Naziv", field: "naziv" },
    { title: "Rezultat", field: "rezultat" },
    { title: "Indikator", field: "indikator" },
    { title: "Ref vrednosti", field: "rf" },
    { title: "Jedinica", field: "jd" },
  ]);

  const updateDummyReports = (e) => {
    e.preventDefault();
    setDummyReports([
      ...dummyReports,
      {
        naziv: naziv,
        rezultat: rezultat,
        indikator: indikator,
        rf: rf,
        jd: jd,
      },
    ]);
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
              id="cars"
              name="cars"
            >
              <option>test</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label className="col-form-label">Napomena:</label>
            <input
              type="text"
              className="form-control"
              id="napomena"
              placeholder="napomena"
            />
          </div>
          <div className="form-group col-md-4">
            <label className="col-form-label">Datum stampanja:</label>
            <input
              type="text"
              className="form-control"
              id="datumstampanja"
              placeholder="datumstampanja"
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
              id="cars"
              name="cars"
            >
              <option>test</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label className="col-form-label">Rezultat:</label>
            <input
              type="text"
              className="form-control"
              id="rezultat"
              placeholder="rezultat"
            />
          </div>
          <div className="form-group col-md-4">
            <label className="col-form-label">Indikator:</label>
            <input
              type="text"
              className="form-control"
              id="indikator"
              placeholder="indikator"
            />
          </div>
        </div>
        <button className="myButton">Dodaj</button>
        <button className="myButton">Obriši</button>
        <button className="myButton">Sačuvaj</button>
      </form>
      <div>
      <MaterialTable
        columns={columns}
        data={dummyReports}
        options={{
          selection: true,
        }}
      />
    </div>

    </div>
  );
});

export default CreateReport;
