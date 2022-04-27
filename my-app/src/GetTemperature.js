import React, {useState, useEffect} from 'react';
import FetchAPI from './FetchAPI';
import LineChart from './views/linecharts/LineChart';
import BarChart from './views/barcharts/Bar Chart';
const GetTemperature = () =>{

    const [temperature,setTemperature] = useState("");
    console.log("temp",temperature);
    useEffect(() => {
        const fetchButtonData = async () => {
            try{
                const response = await FetchAPI.get('/');
                console.log("data",response.data);
                //let t = new Date(Date.now());
                setTemperature(response.data.data.map(t => { return {x: new Date(t.time), y: t.temperature}}));
                
            }catch(err){
                console.log(err);
            }
        }
        const interval = setInterval(() => {
            fetchButtonData()
        }, 1000);
        return () => clearInterval(interval)
    },[]);
    
        return (
            <div>
                <LineChart temp_data = {temperature}/>
                
            </div>
        )
}
export default GetTemperature