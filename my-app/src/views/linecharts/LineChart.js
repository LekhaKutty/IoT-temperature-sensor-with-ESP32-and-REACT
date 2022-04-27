import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class LineChart extends Component {
	render() {
		console.log("props",this.props.temp_data)
		/*let plot_y = [26, 38, 43, 55, 29, 20, 33, 46, 67, 18];
		let t = new Date(Date.now());
		console.log("new Dtae",t);
		console.log("newDate", new Date(t));
		let data_points = new Array();
		for (let i = 0; i < 10; i++) {
			t.setSeconds(i);
			data_points.push({x: new Date(t), y: plot_y[i]});
			console.log(t, data_points[i].x);
		}
		console.log("data points",data_points);*/

		const options = {
			
			animationEnabled: true,
			exportEnabled: true,
			title:{
			text: "Temperature Chart"
			},
	
			axisX:{
				title: "Time",
				gridThickness: 2,
				interval:1, 
				intervalType: "second",        
				valueFormatString: "DDDD MMM YYYY HH:mm:ss", 
				labelAngle: -20
			},
	
			axisY:{
				title: "Temperature",
				interval:3
				},
				data: [{        
					type: "line",
					toolTipContent: "Time {x}: {y}",
					dataPoints: this.props.temp_data
					
				}]
			  
		}

		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default LineChart;                           