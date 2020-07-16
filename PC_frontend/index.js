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
        pcs.forEach(pc => {
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
    pcs.forEach(pc => {
        pc.addEventListener('click', displayPc)
    })

    document.getElementById("pcForm").addEventListener('click', displayCreateForm)
    document.getElementById("pcs").addEventListener('click', getPcs)
    document.querySelectorAll("#delete").forEach(pc => pc.addEventListener('click', removePc))
    document.querySelectorAll("#update-pc").forEach(pc => pc.addEventListener('click', editPc))
    document.getElementById("partForm").addEventListener('click', displayCreatePartForm)
}

function displayPc() {
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

function removePc() {
    event.preventDefault() 
    clearForm()
    fetch(BASE_URL+`/pcs/${event.target.parentElement.dataset.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(event.target.parentElement.remove())
}

function displayCreatePartForm() {
    let pc = this.parentElement.dataset.id
    let partFormDiv = document.getElementById('part-form')
    let html = `
        <form>
            <label>Part:</label>
            <input type="text" id="name">
            <label>Price:</label>
            <input type="text" id="price">
            <input type="submit">
        </form>
    `
    partFormDiv.innerHTML = html
    document.querySelector('form').addEventListener('submit', createPart)
}

function createPart() {
    let pc = this.parentNode.parentElement.dataset.id
    event.preventDefault()
    const part = {
        name: document.getElementById('name').value,
        description: document.getElementById('price').value
    }

    fetch(BASE_URL+'/parts', {
        method: "POST",
        body: JSON.stringify(parts),
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
        clearPartForm()
    })
}

function clearPartForm() {
    let pcFormDiv = document.getElementById('part-form')
    pcFormDiv.innerHTML = ""
}



class Pd {
    constructor(pc) {
        this.id = pc.id
        this.name = pc.name
        this.description = pc.description 
        this.parts = pc.parts
    }
            
    renderPc() {
        return `
        <li id="pc-${this.id}>
        <a href="#" data-id="${this.id}">${this.name}</a>
        - ${this.description}
        <a id="partForm" href="#">Make part</a>
        <div id="part-form"></div>
        <ul id="parts">
        </ul>
        <button id="delete" data-id${this.id}>Delete</button>
        <button id="update-pc" data-id${this.id}>Edit</button>
        </li>`
    }
    renderULs() {
        let ul = document.querySelector(`ul#parts`)
        this.parts.forEach(part => {
            ul.innerHTML += `
            <li>${part.name}</li>
            
            `
        })
    }
}