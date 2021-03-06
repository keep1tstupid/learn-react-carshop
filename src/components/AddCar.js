import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const AddCar = (props) => {
  const INITIAL_STATE = {
    brand: '',
    model: '',
    color: '',
    fuel: '',
    year: '',
    price: ''
  };

  const [open, setOpen] = useState(false);
  const [car, setCar] = useState(INITIAL_STATE);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCar(INITIAL_STATE);
  };

  const handleInputChange = (event) => {
    setCar({...car, [event.target.name]:event.target.value })
  }

  const addNewCar = () => {
    props.saveCar(car);
    handleClose();
  }

  return(
    <div>
      <Button style={{margin: 10}} variant='contained' color='secondary' onClick={handleClickOpen}>
        Add car
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>New car</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            name='brand'
            value={car.brand}
            label='Brand'
            onChange={e => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin='dense'
            name='model'
            value={car.model}
            label='Model'
            onChange={e => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin='dense'
            name='color'
            value={car.color}
            label='Color'
            onChange={event => handleInputChange(event)}
            fullWidth
          />
          <TextField
            margin='dense'
            name='fuel'
            value={car.fuel}
            label='Fuel'
            onChange={event => handleInputChange(event)}
            fullWidth
          />
          <TextField
            margin='dense'
            name='year'
            value={car.year}
            label='Year'
            onChange={event => handleInputChange(event)}
            fullWidth
          />
          <TextField
            margin='dense'
            name='price'
            value={car.price}
            label='Price'
            onChange={event => handleInputChange(event)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={addNewCar} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddCar;
