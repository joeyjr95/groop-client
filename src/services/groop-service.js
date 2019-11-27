import config from '../config'

const GroopService = {

    async postTask( task ) {
        console.log(task)
        const res = await fetch(`${config.API_ENDPOINT}/tasks`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify( task )
            
        });
        console.log(task)
        return await (!res.ok ? res.json().then(err => Promise.reject(err)) : res.json());
      },
    async postGroups({ groups }) {
        const res = await fetch(`${config.API_ENDPOINT}/groups`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ groups })
        });
        return await (!res.ok ? res.json().then(err => Promise.reject(err)) : res.json());
      },
}
export default GroopService