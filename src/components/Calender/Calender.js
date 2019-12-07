import React, { Component } from "react";
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from "moment";
import './Calender.scss'
import "react-big-calendar/lib/css/react-big-calendar.css";
import GroopContext from '../../contexts/GroopContext';
import GroopService from '../../services/groop-service';

const localizer = momentLocalizer(moment);


class Calender extends Component{
  static contextType = GroopContext;

  componentDidMount() {	
    this.getAllTasks()
  }
  
  getAllTasks = () => {
    GroopService.getAllTasks().then(data => {
      this.context.setUserTasks(data);
      this.reMap();
    });
  };

  state = {
    events: []
  };
  addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  reMap(){
    const path = this.props.location.pathname;
    console.log(path)
    const dashboard = "/calendar/dashboard";

    let userTasks = this.context.userTasks;
    let groupTasks = this.context.currentGroupTasks;
    
    if(path === dashboard){
      let newEvents = userTasks.map(task => {
        return {
          start: new Date(task.time_start),
          end: new Date(task.date_due),
          title: task.name
        }
      })
      this.setState({events: [...newEvents]});
    }
    else {
      const newEvents = groupTasks.map(task => {
        return {
          start: new Date(task.time_start),
          end: new Date(task.date_due),
          title: task.name
        }
      })
      this.setState({events: [...newEvents]});
    }
    console.log(this.state.events)
  }

  onEventResize = (type, { event, start, end, allDay }) => {
    this.setState(state => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };
 getRandomColor =()=> {
   let min = Math.ceil(70)
   let max = Math.floor(78)
const h = 920,
s = 100+ '%',
l = Math.floor(Math.random() * ((max - min) + min))+ '%';
return `hsl(${h},${s},${l})`;
  }

  render() {
    //const { userTasks = [] } = this.context;
    //console.log(userTasks);
    return (
      <div className="CalenderContainer">
        <Calendar
          defaultDate={new Date()}
          defaultView="month"
          showMultiDayTimes
          events={this.state.events}
          localizer={localizer}
          resizable
          style={{ height: "80vh" }}
          eventPropGetter={() => { 
            
              const backgroundColor = this.getRandomColor(); 
              return { style: { backgroundColor } }; }
            }
        />
      </div>
    );
  }
}


export default Calender;