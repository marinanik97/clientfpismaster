import React, { useState, Component } from "react";
import "./style/CreateType.css";
import MaterialTable from "material-table";
import { TextField } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

class Moja extends Component {
  state = {
    uzorci: [],
  };
  componentDidMount() {
    this.getTipovi();
  }

  async getTipovi() {
    await fetch("http://localhost:3000/tipovi")
      .then((response) => response.json())
      .then((response) => this.setState({ uzorci: response.data }))
      .catch((err) => console.error(err));
      
  }

  renderUzorak = ({ tipuzorkaid, naziv, opis }) => (
    <div key={tipuzorkaid}>{naziv}</div>
  );

  render() {
    var { uzorci } = this.state;
    return(
    <div>{uzorci.map(this.renderUzorak)}</div>
    );
  }
}

export default Moja;
