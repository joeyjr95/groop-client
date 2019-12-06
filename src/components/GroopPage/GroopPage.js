/// <reference path='../../react-vis.d.ts'/>
import GroopContext from "../../contexts/GroopContext";
import GroopService from "../../services/groop-service";
import Filter from "../../components/Filter/Filter";
import React, { Component } from "react";
import { RadialChart } from "react-vis";
import TaskItem from "../TaskItem/TaskItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

export default class GroopPage extends Component {
  static contextType = GroopContext;

  componentDidMount() {
    GroopService.getGroup(this.props.group_id).then(data => {
      let groupId = parseInt(data.id);
      this.context.setCurrentGroup(groupId);
    });
    this.getGroupTasks();
    this.getGroupMembers();
  }

  getGroupTasks = () => {
    GroopService.getGroupTasks(this.props.group_id).then(data => {
      this.context.setCurrentGroupTasks(data);
      this.context.setFilteredTasks(data);
    });
  };

  getGroupMembers = () => {
    GroopService.getGroupMembers(this.props.group_id).then(data => {
      console.log(data);
      this.context.setCurrentGroupMembers(data);
    });
  };

  render() {
    const {
      //currentGroupTasks = [],
      currentGroupMembers = [],
      filteredTasks = []
    } = this.context;
    console.log(filteredTasks);
    return (
      <>
        <Filter {...this.props} />
        <div className="members-section-mobile">
          <div className="members-mobile">
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
                  <p>{member.username}</p>
                </li>
              ))}
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
                    <br />
                    <FontAwesomeIcon icon={faMedal} id="pointsIcon" />
                    <span className="userScore">{member.score}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="scores-section">
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
                      <p className="userScore">{memScore.username}: {memScore.score}</p>
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
                      <p className="userScore">{memScore.username}: {memScore.score}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="pieChart">
              <RadialChart
                colorType={"literal"}
                colorDomain={[0, 100]}
                colorRange={[0, 10]}
                getLabel={d => d.name}
                data={[
                  { angle: Number(17), color: "#1c939a", name: "allie" },
                  { angle: Number(22), color: "#72bce0", name: "User" },
                  { angle: Number(9), color: "#BAD7E6", name: "Derek" },
                  { angle: Number(5), color: "#5891AD", name: "Brian" }
                ]}
                labelsRadiusMultiplier={1}
                labelsStyle={{ fontSize: 16 }}
                showLabels
                style={{ stroke: "#fff", strokeWidth: 2 }}
                width={window.innerWidth / 5}
                height={window.innerWidth / 5}
              ></RadialChart>
              <p> How tasks have been split today</p>
            </div>
          </div>
          <div className="task-list-container">
            <div id="fixed-container">
              <label htmlFor="task-list" id="label-task-list">
                Today's tasks
              </label>
            </div>
            <ul className="task-list">
              {filteredTasks.map((task, i) => {
                console.log(task);
                return (
                  <TaskItem
                    getTasks={() => this.getGroupTasks()}
                    task={task}
                    {...this.props}
                    key={`task${i}`}
                  />
                );
              })}
            </ul>
          </div>
        </section>
      </>
    );
  }
}
