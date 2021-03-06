import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import Button from '@material-ui/core/Button';
import { CSVLink } from 'react-csv';
import AddCar from './AddCar';
import EditCar from './EditCar';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch ('https://carstockrest.herokuapp.com/cars')
      .then(response => response.json())
      .then(data => setCars(data._embedded.cars));
  }

  const updateCar = (car, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
    })
      .then(fetchData)
      .catch(err => console.error(err));
  }

  const deleteCar = (link) => {
    if (window.confirm('Are you sure?')){
      fetch(link, {method: 'DELETE'})
        .then(fetchData)
        .catch(err => console.error(err));
    }
  }

  const saveCar = (car) => {
    fetch ('https://carstockrest.herokuapp.com/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
    })
      .then(fetchData)
      .catch(err => console.log(err));
  }

  // data for uploading csv
  const data = cars;
  const headers = [
    { label: 'Brand', key: 'brand' },
    { label: 'Model', key: 'model' },
    { label: 'Color', key: 'color' },
    { label: 'Fuel', key: 'fuel' },
    { label: 'Year', key: 'year' },
    { label: 'Price', key: 'price' },
  ];

  // data for table
  const columns = [
    {
      Header: 'Brand',
      accessor: 'brand',
    },
    {
      Header: 'Model',
      accessor: 'model',
    },
    {
      Header: 'Color',
      accessor: 'color',
    },
    {
      Header: 'Fuel',
      accessor: 'fuel',
    },
    {
      Header: 'Year',
      accessor: 'year',
    },
    {
      Header: 'Price',
      accessor: 'price',
    },
    {
      Cell: row =>
        <EditCar
          updateCar={updateCar}
          car={row.original}
        />,
      sortable: false,
      filterable: false,
      width: 100
    },
    {
      accessor: '_links.self.href',
      Cell: row =>
        <Button
          size='small'
          variant='contained'
          color='secondary'
          onClick={() => deleteCar(row.value)}> Delete </Button>,
      sortable: false,
      filterable: false,
      width: 100
    },
  ]

  return (
    <div>
      <AddCar saveCar={saveCar} />
      <ReactTable
        filterable={true}
        data={cars}
        columns={columns}
      />
      <Button style={{margin: 10}} variant='contained'>
        <CSVLink data={data} headers={headers}>
          Download as CSV
        </CSVLink>
      </Button>
    </div>
  )
}

export default CarList;
