/// <reference path='../../react-vis.d.ts'/>
import GroopContext from '../../contexts/GroopContext';
import GroopService from '../../services/groop-service';
import Filter from '../../components/Filter/Filter';
import React, { Component } from 'react';
import { RadialChart, Hint } from 'react-vis';
import TaskItem from '../TaskItem/TaskItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default class GroopPage extends Component {
  static contextType = GroopContext;
  state = {
    hoveredRadial: false
  }

  componentDidMount = async () => {
    await GroopService.getGroup(this.props.match.params.group_id);
    this.getGroupTasks();
    this.getGroupMembers();
  };

  getGroupTasks = async () => {
    const tasks = await GroopService.getGroupTasks(this.props.group_id);
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    // filter expired tasks (date due before today)
    let filteredTasks = tasks.filter(task => {
      let task_due_date = new Date(task.date_due);
      return task_due_date >= today ? 1 : 0;
    });

    // sort by ascending date due
    filteredTasks.sort((a, b) => {
      return new Date(a.date_due) < new Date(b.date_due) ? false : true;
    });
    this.context.setCurrentGroupTasks(filteredTasks);
    this.context.setFilteredTasks(filteredTasks);
  };

  getGroupMembers = () => {
    GroopService.getGroupMembers(this.props.group_id).then(data => {
      this.context.setCurrentGroupMembers(data);
    });
  };
  chartAngle(member) {
    let filteredTasks = this.context.currentGroupTasks.filter(tasks => {
      return tasks.user_assigned_id === member.member_id;
    });
    let priorityAngle = filteredTasks.map(tasks => {
      return tasks.priority;
    });
    if (priorityAngle.length === 0) {
      return 0;
    } else {
      return Number(priorityAngle.reduce((a, b) => a + b));
    }
  }
  buildValue(hoveredRadial){
    return {
      name: hoveredRadial
    }
  }
  

  renderChart() {
    const {hoveredRadial} = this.state
    const { currentGroupMembers = [] } = this.context;
    let colors = [
      '#1c939a',
      '#72bce0',
      '#bad7e6',
      '#5891ad',
      '#1780B0',
      '#1653A6',
      '#126266',
      '#52A6AA',
      '#105659',
      '#A62E7B',
    ];
    if (currentGroupMembers.length < 2) {
      return <> </>;
    } else {
      let chartInfo = currentGroupMembers.map((member, i) => ({
        angle: this.chartAngle(member),
        color: colors[i % (colors.length - 1)],
        name: member.username,
        label: String(this.chartAngle(member)),
      }));
      return (
        
        <div className="pieChart">
           <p> How tasks have been split for this week weighted by priority</p>
          <RadialChart
          onValueMouseOver={d => {
            this.setState({hoveredRadial: d.name})
            }}
          onValueMouseOut={v => this.setState({hoveredRadial: false})}
            colorType={'literal'}
            innerRadius={92}
            radius={120}
            colorDomain={[0, 100]}
            colorRange={[0, 10]}
            getLabel={d => d.label}
            data={chartInfo}
            labelsRadiusMultiplier={0.7}
            labelsStyle={{ fontSize: 18, backgroundColor: '#202020' }}
            showLabels
            
            style={{ stroke: '#202020', strokeWidth: 5 }}
            width={250}
            height={250}
          ></RadialChart>
           {hoveredRadial ? (
         <span className="hoveredRadial">{hoveredRadial}</span>
        ) : <span className="hoveredRadial"></span>}
          
          
        </div>
      );
    }
  }

  render() {
    console.log(this.state.hoveredRadial)
    const { currentGroupMembers = [], filteredTasks = [] } = this.context;
    return (
      <>
        <Filter {...this.props} />
        <div className="members-section-mobile">
          <div className="members-mobile">
            <label htmlFor="menu" id="label-menu">
              Members
            </label>
            <ul className="menu">
              {currentGroupMembers.map(member => {
                return (
                  <li
                    key={member.member_id}
                    id={member.member_id}
                    aria-live="polite"
                  >
                    <p>{member.username}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <section className="groop-page-list">
          <div className="members-section">
            <div className="members">
              <label htmlFor="menu" id="label-menu">
                Members
              </label>
              <ul className="menu">
                {currentGroupMembers.map(member => (
                  <li
                    key={member.member_id}
                    id={member.member_id}
                    aria-live="polite"
                  >
                    {member.username}
                    <FontAwesomeIcon icon={faMedal} id="pointsIcon" />
                    <span className="userScore">{member.score}</span>
                  </li>
                ))}
              </ul>
            </div>
            {this.renderChart()}
          </div>
          <div className="task-list-container">
            <label htmlFor="task-list" id="label-task-list">
              Upcoming Tasks
            </label>
            <ul className="task-list">
              {filteredTasks.length !== 0 ? (
                filteredTasks.map((task, i) => {
                  return (
                    <TaskItem
                      getTasks={() => this.getGroupTasks()}
                      task={task}
                      {...this.props}
                      key={`task${i}`}
                    />
                  );
                })
              ) : (
                <div className="empty-list">
                  No Tasks Available.{' '}
                  <Link to={`/add-task/${this.props.match.params.group_id}`}>
                    Add a task
                  </Link>{' '}
                  to get started.{' '}
                </div>
              )}
            </ul>
          </div>
        </section>
      </>
    );
  }
}
