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
    const dashboard = "/calendar/dashboard";

    let userTasks = this.context.userTasks;
    let groupTasks = this.context.currentGroupTasks;
    
    if(path === dashboard){
      let newEvents = userTasks.map(task => {
        return {
          start: new Date(task.time_start),
          end: new Date(task.date_due),
          title: task.name,
          id: task.id
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
  }

  onEventResize = (type, { event, start, end, allDay }) => {
    this.setState(state => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  handleSelectEvent(event) {
    let path = `/edit-task/${event.id}`;
    this.props.history.push(path);
}


  render() {
    //const { userTasks = [] } = this.context;
    return (
      <div className="CalenderContainer">
        <Calendar
          defaultDate={new Date()}
          defaultView="month"
          showMultiDayTimes
          events={this.state.events}
          onSelectEvent={(event) =>this.handleSelectEvent(event)}
          localizer={localizer}
          resizable
          style={{ height: "80vh" }}
        />
      </div>
    );
  }
}


export default Calender;