import React from "react";
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CarList from "./components/CarList";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">Car Shop</Typography>
        </Toolbar>
      </AppBar>
      <CarList />
    </div>
  );
}

export default App;
