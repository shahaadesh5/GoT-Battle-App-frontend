import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';


class App extends Component {

  constructor(props){
    super(props);
    this.state={
      battles: [],
      searchData: []
    }
  }
  componentDidMount(){
    axios.get('https://got-battle-app-backend.herokuapp.com/got-api/battles')
    .then(response=>{
        console.log("Data recieved!");
        this.setState({
          battles: response.data
        })
        console.log(this.state.battles);
    })
  }
  searchBattleLocation=(event,value)=>{
    console.log(value);
    axios.get('https://got-battle-app-backend.herokuapp.com/got-api/search?location='+value)
    .then(response=>{
      console.log(response.data);
      this.setState({
        searchData: response.data
      })
    })
  }

  render = ()=>{
    let items = this.state.battles;
    return (
      <div className="App">
        <h1 > Game of Thrones - Battle App</h1>
        <Autocomplete
        onChange={this.searchBattleLocation}
        freeSolo
        disableClearable
        options={items.map((option) => option.location)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
      {this.state.searchData.map(battleDetail=>(
        <div key={battleDetail._id} className="battle-wrapper">
          <h2>{battleDetail.name}</h2>
      <p>Fought in {battleDetail.year}</p>
      <p>Location: {battleDetail.location}, {battleDetail.region}</p>
      <div className="grid_container">
      <Grid container spacing={2}>
      <Grid item xs={12} sm={5}>
          <Paper >
            <div className="king-card attacker">
            <h3><Chip label={battleDetail.attacker_king} variant="outlined" size="medium" color="secondary" /></h3>
      <p>Commanded by: {battleDetail.attacker_commander}</p>
            <p>Troops: {battleDetail.attacker_1}</p>
            </div>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={2}>
      <Avatar>VS</Avatar>
        </Grid>
      <Grid item xs={12} sm={5}>
          <Paper >
            <div className="king-card defender">
            <h3><Chip label={battleDetail.defender_king} variant="outlined" size="medium" color="primary" /></h3>
      <p>Commanded by: {battleDetail.defender_commander}</p>
            <p>Troops: {battleDetail.defender_1}</p>
            </div>
            </Paper>
        </Grid>
        </Grid>
        </div>
          </div>
      ))}
      </div>
    );

  }
}

export default App;
