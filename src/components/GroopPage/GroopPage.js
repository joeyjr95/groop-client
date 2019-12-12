/// <reference path='../../react-vis.d.ts'/>
import GroopContext from '../../contexts/GroopContext';
import GroopService from '../../services/groop-service';
import Filter from '../../components/Filter/Filter';
import React, { Component } from 'react';
import { RadialChart } from 'react-vis';
import TaskItem from '../TaskItem/TaskItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default class GroopPage extends Component {
  static contextType = GroopContext;

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

  renderChart() {
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
      }));
      return (
        <div className="pieChart">
          <RadialChart
            colorType={'literal'}
            colorDomain={[0, 100]}
            colorRange={[0, 10]}
            getLabel={d => d.name}
            data={chartInfo}
            labelsRadiusMultiplier={1}
            labelsStyle={{ fontSize: 16, backgroundColor: '#202020' }}
            showLabels
            style={{ stroke: '#202020', strokeWidth: 2 }}
            width={250}
            height={250}
          ></RadialChart>
          <p> Point totals for assigned tasks</p>
        </div>
      );
    }
  }

  render() {
    const { currentGroupMembers = [], filteredTasks = [] } = this.context;
    return (
      <>
        <Filter {...this.props} />
        <div className="members-section-mobile">
          <div className="members-mobile">
            <label htmlFor="menu" id="label-menu">
              Members
            </label>
            <ul className="menu" role="menu">
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
              <ul className="menu" role="menu">
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
            {/* <div className="scores-section">
              <div className="scores-section1">
                <label htmlFor="weekly-scores" id="weekly-scores-label">
                  Top Scores for today
                </label>
                <ol className="AllTimeScore" role="menu">
                  {currentGroupMembers.map(memScore => (
                    <li
                      key={memScore.member_id}
                      id={memScore.member_id}
                      aria-live="polite"
                    >
                      <p className="userScore">
                        {memScore.username}: {memScore.score}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="scores-section2">
                <label htmlFor="total-scores" id="total-scores-label">
                  Top Scores all time
                </label>
                <ol className="AllTimeScore" role="menu">
                  {currentGroupMembers.map(memScore => (
                    <li
                      key={memScore.member_id}
                      id={memScore.member_id}
                      aria-live="polite"
                    >
                      <p className="userScore">
                        {memScore.username}: {memScore.score}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div> */}
            {/* <div className="pieChart">
              <RadialChart
                colorType={'literal'}
                colorDomain={[0, 100]}
                colorRange={[0, 10]}
                getLabel={d => d.name}
                data={
                  this.renderChart()
                }
                labelsRadiusMultiplier={1}
                labelsStyle={{ fontSize: 16 }}
                showLabels
                style={{ stroke: '#fff', strokeWidth: 2 }}
                width={250}
                height={250}
              ></RadialChart>
              <p> How tasks have been split today</p>
            </div> */}
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
