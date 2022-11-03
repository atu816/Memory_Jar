const server = {};

server.deleteFetch = (currState, currMemory) => {
  console.log('deleting function')
  fetch(`/db/delete?state=${currState}&subject=${currMemory}`, {
    method: 'DELETE'
  })
    .then(res => res.json)
    .then(data => console.log(data))
    .catch(err => console.log('Deletion error: ', err))
}

server.syncDB = (cb) => {
  fetch('/db/past_memories')
  .then(res => res.json())
  .then(dbData => {
    console.log('Succesfully mounted!')
    cb(dbData)
  })
  .catch(err => { log: err });
}

export default server;