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

  reMap(){
    const path = this.props.location.pathname;
    console.log(path)
    const dashboard = "/calendar/dashboard";

    let userTasks = this.context.userTasks;
    let groupTasks = this.context.currentGroupTasks;

    if(path === dashboard){
      let newEvents = userTasks.map(task => {
        return {
          start: task.time_start,
          end: moment(task.date_due).add(1, 'days'),
          title: task.name
        }
      })
      this.setState({events: [...newEvents]});
    }
    else {
      const newEvents = groupTasks.map(task => {
        return {
          start: task.time_start,
          end: moment(task.date_due).add(1, 'days'),
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

  render() {
    const { userTasks = [] } = this.context;
    //console.log(userTasks);
    return (
      <div className="CalenderContainer">
        <Calendar
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          localizer={localizer}
          resizable
          style={{ height: "80vh" }}
        />
      </div>
    );
  }
}


export default Calender;