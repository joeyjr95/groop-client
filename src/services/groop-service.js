import config from '../config';
import TokenService from '../services/token-service';

const GroopService = {
  ///TASK SECTION

  postTask(task) {
    return fetch(`${config.API_ENDPOINT}/tasks`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(task),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json(),
    );
  },
  getAllTasks() {
    return fetch(`${config.API_ENDPOINT}/tasks`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json(),
    );
  },
  getGroupTasks(currentGroupid) {
    return fetch(`${config.API_ENDPOINT}/tasks/${currentGroupid}`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json(),
    );
  },
  getTaskById(taskId) {
    return fetch(`${config.API_ENDPOINT}/tasks/task/${taskId}`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json(),
    );
  },
  apiPatchTask(taskId, newTask) {
    return fetch(`${config.API_ENDPOINT}/tasks/task/${taskId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newTask),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json(),
    );
  },
  apiDeleteTask(taskId) {
    return fetch(`${config.API_ENDPOINT}/tasks/task/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : null));
  },

  /// GROUP SECTION
  getGroup(currentGroup) {
    return fetch(`${config.API_ENDPOINT}/groups/${currentGroup}`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json(),
    );
  },

  postGroup(group) {
    return fetch(`${config.API_ENDPOINT}/groups`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(group),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json(),
    );
  },

  deleteGroup(currentGroup) {
    return fetch(`${config.API_ENDPOINT}/groups/${currentGroup}`, {
      method: 'DELETE',
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : null));
  },
  ///GROUP MEMBERS SECTION

  deleteGroupMember(body) {
    return fetch(
      `${config.API_ENDPOINT}/groupsmembers/${body.group_id}/${body.member_id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      },
    ).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : null));
  },

  getUserGroups() {
    return fetch(`${config.API_ENDPOINT}/groupsmembers`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json(),
    );
  },
  getGroupMembers(currentGroup) {
    return fetch(`${config.API_ENDPOINT}/groupsmembers/${currentGroup}`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json(),
    );
  },
  addNewGroupMember(body) {
    return fetch(`${config.API_ENDPOINT}/groupsmembers`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(body),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json(),
    );
  },
  /// CATERGORY SECTION
  getCategories(currentGroup) {
    return fetch(`${config.API_ENDPOINT}/categories/group/${currentGroup}`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json(),
    );
  },
};
export default GroopService;
