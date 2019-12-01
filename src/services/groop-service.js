import config from '../config'
import TokenService from '../services/token-service'


const GroopService = {

    ///TASK SECTION

    async postTask( task ) {
        console.log(task)
        const res = await fetch(`${config.API_ENDPOINT}/tasks`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify( task )
            
        });
        console.log(task)
        return await (!res.ok ? res.json().then(err => Promise.reject(err)) : res.json());
      },
      async getAllTasks() {
        const res = await fetch(`${config.API_ENDPOINT}/tasks`, {
              headers: {
                  'Authorization': `bearer ${TokenService.getAuthToken()}`,
              },
          });
          return await ((!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json());
      },
      async getGroupTasks(currentGroupid) {
        const res = await fetch(`${config.API_ENDPOINT}/tasks/${currentGroupid}`, {
              headers: {
                  'Authorization': `bearer ${TokenService.getAuthToken()}`,
              },
          });
          return await ((!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json());
      },

      /// GROUP SECTION
      async getGroup(currentGroup) {
        const res = await fetch(`${config.API_ENDPOINT}/groups/${currentGroup}`, {
              headers: {
                  'Authorization': `bearer ${TokenService.getAuthToken()}`,
              },
          });
          return await ((!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json());
      },

    async postGroup( group ) {
        const res = await fetch(`${config.API_ENDPOINT}/groups`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify( group )
        });
        return await (!res.ok ? res.json().then(err => Promise.reject(err)) : res.json());
      },
      deleteGroup(currentGroup) {
        return fetch(`${config.API_ENDPOINT}/groups/${currentGroup}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `bearer ${TokenService.getAuthToken()}`,
          },
         
        })
      },

      ///GROUP MEMBERS SECTION

      deleteGroupMember(currentGroup, selectedMember) {
        return fetch(`${config.API_ENDPOINT}/groupsmembers/${currentGroup.id}/${selectedMember.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `bearer ${TokenService.getAuthToken()}`,
          },
         
        })
      },
      async getUserGroups() {
        const res = await fetch(`${config.API_ENDPOINT}/groupsmembers`, {
              headers: {
                  'Authorization': `bearer ${TokenService.getAuthToken()}`,
              },
          });
          return await ((!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json());
      },
      async getGroupMembers(currentGroup) {
        const res = await fetch(`${config.API_ENDPOINT}/groupsmembers/${currentGroup}`, {
              headers: {
                  'Authorization': `bearer ${TokenService.getAuthToken()}`,
              },
          });
          return await ((!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json());
      },
      async addNewGroupMember(body) {
        const res = await fetch(`${config.API_ENDPOINT}/groupmembers/${body.member_id}`, {
              method: 'POST',
              headers: {
                  'content-type': 'application/json',
                  'Authorization': `bearer ${TokenService.getAuthToken()}`,
              },
              body: JSON.stringify(body),
          });
          return await ((!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json());
      },

    
}
export default GroopService