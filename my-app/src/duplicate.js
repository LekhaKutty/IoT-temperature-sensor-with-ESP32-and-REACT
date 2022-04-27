const express = require('express')
const cors = require("cors");
const api_helper = require('./API_helper')
const app = express()
const port = 8081

app.use(cors());

let buffer_length = 10;
let temperature_datas = new Array(buffer_length);
let write_index = 0;

const fetch = require('node-fetch')
const time = new Date();

app.get('/', (req,res) => {
  res.status(200).json({
    staus:"Success",
    data: circularBufferPop()
  });
});
/* for allocating current temperature last, returns an array with correct order*/
function circularBufferPop() {
  let temp_datas = new Array();
  let read_index = write_index;
  for (let i = 0; i < buffer_length; i++) {
    temp_datas.push(temperature_datas[read_index++])
    if (read_index == buffer_length) {
      read_index = 0;
    }
  }
  return temp_datas;
}
/*saving latest 10 temperature to the temperature datas array , here temperature_datas[write_index] is the current temperature*/
function circularBufferPush(data) {
  temperature_datas[write_index++] = data;
  if (write_index == buffer_length) {
    write_index = 0;
  }
}

function saveData(metrics) {
  circularBufferPush({time: time.toUTCString(), temperature: metrics.Temperature})
  console.log(temperature_datas)
}

const getData = () => {
  fetch('http://192.168.1.143/')
    .then(response => response.json())
    .then(data => saveData(data))
    .catch(err => console.error(err))
}


const interval = setInterval(getData, 1000);

app.listen(port, () => console.log(`App listening on port ${port}!`))