const BASE_URL = 'http://localhost:3000'

getPcs();

window.addEventListener('load', () => {
    attachClickToLinks()
})

function getPcs() {
    clearForm() 
    clearULs()
    let showPcs = document.querySelector('#show-pc ul')
    fetch(BASE_URL+"/pcs")
    .then(resp => resp.json())
    .then(pcs => {
        pcs.map(pc => {
            let pd = new Pd(pc)
            showPcs.innerHTML += pd.renderPc()
            pd.renderULs()
        })
        attachClickToLinks()
    })
}

function clearForm() {
    let pcFormDiv = document.getElementById('pc-form')
    pcFormDiv.innerHTML = ""
}

function clearULs() {
    let showPcs = document.querySelector('#show-pcs ul')
    showPcs.innerHTML = ""
    let showPc = document.querySelector('#show-pc')
    showPcs.innerHTML = ""
}

function attachClickToLinks () {
    let pcs = document.querySelectorAll('li a')

    document.getElementById("pcForm").addEventListener('click', displayCreateForm)
    document.querySelectorAll("#delete").forEach(pc => pc.addEventListener('click', removePc))
    document.querySelectorAll("#partForm").forEach(pc => pc.addEventListener('click', displayCreatePartForm))
    document.querySelectorAll("#deletePart").forEach(part => part.addEventListener('click', removePart))
}

function displayPc() {
    event.preventDefault()
    clearForm()
    clearULs()
    let id = event.target.dataset.id 
    let showPcs = document.getElementById('main')
    showPcs.innerHTML = ""
    fetch(BASE_URL+'/pcs/'+id)
    .then(resp => resp.json())
    .then(pc => {
        showPcs.innerHTML += `
        <h3>${pc.name}</h3>
        <p>${pc.description}</p>
        `
    })
}

function displayCreateForm() {
    event.preventDefault()
    let pcFormDiv = document.getElementById('pc-form')
    let html = `
        <form>
            <label>Name:</label>
            <input type="text" id="name">
            <label>Description:</label>
            <input type="text" id="description">
            <input type="submit">
        </form>
    `
    pcFormDiv.innerHTML = html
    document.querySelector('form').addEventListener('submit', createPc)
}


function createPc() {
    event.preventDefault()
    const pc = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value
    }
    
    fetch(BASE_URL+'/pcs', {
        method: "POST",
        body: JSON.stringify(pc),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(pc => {
        let showPcs = document.querySelector('#show-pcs ul')
        let pd = new Pd(pc)
        showPcs.innerHTML += pd.renderPc()
        pd.renderULs()
        attachClickToLinks()
        clearForm()
    })
}

function displayCreatePartForm() {
    event.preventDefault()
    let id = this.dataset.id
    let partFormDiv = document.querySelector(`li#pc-${id} #parts`)
    let html = `
        <form data-id='${id}'>
            <label>Part:</label>
            <input type="text" id="name">
            <label>Price:</label>
            <input type="text" id="price">
            <input type="submit"></input>
        </form>
    `
    partFormDiv.innerHTML = html
    document.querySelector('form').addEventListener('submit',  createPart)
}

function createPart(id) {
    event.preventDefault()
    let currentId = this.dataset.id
    const part = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        pc_id: currentId 
    }

    fetch(BASE_URL+`/pcs/${currentId}/parts`, {
        method: "POST",
        body: JSON.stringify(part),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(part => {
        let showPart = document.querySelector('#parts').innerHTML += `
        <li id='${part.id}'>
        Part: ${part.name} $${part.price}<button id="deletePart" data-id="${part.id}">Delete</button></li>
        </li>`
        attachClickToLinks()
        clearPartForm()
    })
}

function removePc() {
    event.preventDefault() 
    clearForm()
    fetch(BASE_URL+`/pcs/${event.target.dataset.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(event.target.parentElement.remove())
}

function removePart() {
    event.preventDefault()
    let id = this.dataset.id 
    clearPartForm()
    fetch(BASE_URL+`/parts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(event.target.parentElement.remove())
    // .then(clearParts())
    // .then(Pd.renderULs())
}

function clearPartForm() {
    let pcFormDiv = document.getElementById('part-form')
    pcFormDiv.innerHTML = ""
}

function clearParts () {
    let clear = document.getElementById('parts')
    clear.innerHTML = ""
}

