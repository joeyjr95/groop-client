import React, { Component } from "react";
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import './Calender.scss'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import GroopContext from '../../contexts/GroopContext';
import GroopService from '../../services/groop-service';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

class Calender extends Component {
  static contextType = GroopContext;

  componentDidMount() {
    this.getAllTasks();
  }

  getAllTasks = () => {
    console.log('getting all tasks');
    GroopService.getAllTasks().then(data => {
      this.context.setUserTasks(data);
    });
  };

  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Some title"
      }
    ]
  };

  onEventResize = (type, { event, start, end, allDay }) => {
    this.setState(state => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log(start);
  };

  render() {
    const { userTasks = [] } = this.context;
    console.log(userTasks);
    return (
      <div className="CalenderContainer">
        <DnDCalendar
          defaultDate={new Date()}
          defaultView="month"
          events={userTasks}
          localizer={localizer}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          style={{ height: "70vh" }}
        />
      </div>
    );
  }
}

export default Calender;