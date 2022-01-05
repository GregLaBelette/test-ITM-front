const host = 'http://localhost:3000'

window.onload = () => {
  updateFields();
}

const updateFields = () => {
  fetch(host)
  .then(res => res.json)
  .then((data) => { console.log(data) })
}
