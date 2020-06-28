import React, {useState, useEffect, Fragment} from "react";
import "./style/CreateReport.css";
import TextField from "@material-ui/core/TextField";

import {withStyles} from "@material-ui/core/styles";
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
import {useLocation} from "react-router-dom";
import {refromatDate, formatDate} from "../utils/utlis.js";


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Button} from "@material-ui/core";

const CreateReport = () => {
    const [age, setAge] = React.useState("");
    const [doktori, setDoktori] = React.useState([]);
    const [parametri, setParametri] = React.useState([]);
    const [datumst, setDatumSt] = useState(new Date());
    const [napomena, setNapomena] = React.useState("");
    const [getKarton, setKarton] = useState();
    const [parametar, setParametar] = useState();
    const [doktor, setDoktor] = useState();

    const location = useLocation();

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    useEffect(() => {
        getDoktori();
        getParametri();
        if (location && location.state && location.state.from && location.state.from.kartonid) {
            getKartonById(location.state.from.kartonid);
        }
    }, []);


    const getKartonById = (id) => {
        fetch("http://localhost:9000/kartoni/" + id)
            .then((response) => response.json())
            .then((response) => {
                setKarton(response[0])
                console.log(response);
            })
            .catch((err) => console.error(err));
    }

    const getDoktori = () => {
        fetch("http://localhost:9000/doktori")
            .then((response) => response.json())
            .then((response) => setDoktori(response))
            .catch((err) => console.error(err));
    };

    const getParametri = () => {
        fetch("http://localhost:9000/parametri")
            .then((response) => response.json())
            .then((response) => {
                console.log(response, "params");
                setParametri(response);
            })
            .catch((err) => console.error(err));
    };


    const renderDoktori = () => {
        if (doktori) {
            console.log(doktori);
            return doktori.map((doktor, index) => {
                return (
                    <MenuItem key={index + "|"} value={doktor.doktorid}>
                        {doktor.ime + " " + doktor.prezime}
                    </MenuItem>
                );
            });
        } else {
            return <option>test</option>;
        }
    };
    const renderParametri = () => {
        console.log(parametri, "test")
        if (parametri) {
            return parametri.map((parametar, index) => {
                return (
                    <MenuItem key={index + "|"} value={parametar.parametarid}>
                        {parametar.naziv}
                    </MenuItem>
                );
            });
        } else {
            return <option>test</option>;
        }
    };
    const [parametarid, setParamid] = useState(0);
    const [naziv, setNaziv] = useState("");
    const [rezultatparametra, setRezP] = useState("");
    const [indikator, setIndikator] = useState("");
    const [rf, setRf] = useState("");
    const [jd, setJd] = useState("");
    const [dummyReports, setDummyReports] = useState([]);
    const [stavkeIzv, setStavkeIzv] = useState([]);
    const [columns, setColums] = useState([
        {title: "ParametarID", field: "parametarid"},
        {title: "Naziv", field: "naziv"},
        {title: "Rezultat", field: "rezultatparametra"},
        {title: "Indikator", field: "indikator"},
        {title: "Ref vrednosti", field: "rf"},


    ]);

    const sendIzvestaj = async (event) => {
        event.preventDefault();


        let newArray = dummyReports.map((report) => {
            let {indikator, rezultatparametra} = report
            return {
                indikator,
                rezultatparametra,
                parametarid: parametar.parametarid,
                izvestajid: 2,
                kartonid: getKarton.kartonid,
                status: "dodavanje"
            }
        })
        const rezObj = {
            kartonid: getKarton.kartonid,
            datumst: formatDate(datumst),
            napomena: napomena,
            doktorid: doktor.doktorid,
            stavke: newArray

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
        console.log(
            {
                rf: parametar.referentnevrednosti,
                naziv: parametar.naziv,
                parametarid: parametar.parametarid,
                rezultatparametra: rezultatparametra,
                indikator: indikator,
            }, "aslk;dasd;laskas;das"
        )
        setDummyReports([
            ...dummyReports,
            {
                rf: parametar.referentnevrednosti,
                naziv: parametar.naziv,
                parametarid: parametar.parametarid,
                rezultatparametra: rezultatparametra,
                indikator: indikator,
            },
        ]);
    };
    const changeParam = (e) => {
        console.log((parametri.find((param) => param.parametarid == e.target.value)));
        setParametar(parametri.find((param) => param.parametarid == e.target.value));
        console.log(e.target.value);
    }
    const changeDoktor = (e) => {
        console.log((doktori.find((doktor) => doktor.doktorid == e.target.value)));
        setDoktor(doktori.find((doktor) => doktor.doktorid == e.target.value));
        console.log(e.target.value);
    }
    console.log(dummyReports);

    return (
        <Fragment>
            <Grid container spacing={3}>
                <Grid container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                      spacing={1}>
                    <Grid item md={3} xl={3} lg={3} xs={3}>
                        <TextField
                            label={"Ime i prezime"}
                            type="text"
                            className="form-control"
                            id="imeprezime"
                            value={getKarton ? getKarton.ime + " " + getKarton.prezime : "imeprezime"}
                            disabled
                        />
                    </Grid>
                    <Grid item md={3} xl={3} lg={3} xs={3}>
                        <TextField
                            label={"Datum rodjenja"}
                            type="text"
                            className="form-control"
                            id="datumRodjenja"
                            placeholder="datumRodjenja"
                            value={getKarton ? refromatDate(getKarton.datumRodjenja) : "datum"}
                            disabled
                        />
                    </Grid>
                    <Grid item md={3} xl={3} lg={3} xs={3}>
                        <TextField
                            label={"Pol"}
                            type="text"
                            className="form-control"
                            id="pol"
                            placeholder="pol"
                            value={getKarton ? getKarton.pol : "pol"}
                            disabled
                        />
                    </Grid>
                    <Grid item md={3} xl={3} lg={3} xs={3}>
                        <TextField
                            label={"KartonID"}
                            type="text"
                            className="form-control"
                            id="kartonid"
                            placeholder="kartonid"
                            value={getKarton ? getKarton.kartonid : "kid"}
                            disabled
                        />
                    </Grid>
                </Grid>
                <Grid container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                      spacing={1}>
                    <Grid item md={4} xl={4} lg={4} xs={4}>
                        <label className="col-form-label">Doktor:</label>
                        <Select
                            onChange={changeDoktor}
                        >
                            {renderDoktori()}
                        </Select>
                    </Grid>
                    <Grid item md={4} xl={4} lg={4} xs={4}>
                        <TextField
                            label={"Napomena"}
                            type="text"
                            className="form-control"
                            id="napomena"
                            placeholder="napomena"
                            onChange={(e) => setNapomena(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={4} xl={4} lg={4} xs={4}>
                        <label className="col-form-label">Datum:</label>
                        <DatePicker
                            className="form-control"
                            selected={datumst}
                            onChange={(datumst) => setDatumSt(datumst)}
                            dateFormat="yyyy-MM-dd"
                        />
                    </Grid>
                </Grid>


                <Button
                    variant="contained"
                    color="primary"
                    className="myButton" onClick={updateDummyReports}>
                    Dodaj
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className="myButton" onClick={sendIzvestaj}>
                    Sačuvaj
                </Button>
            </Grid>
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
        </Fragment>
    );
};

export default CreateReport;
