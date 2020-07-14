const BASE_URL = 'http://localhost:3000'

window.addEventListener('load', () => {
    attachClickToLinks()
})

function getPcs() {
    clearForm() 
    clearUls()
    let showTodos = document.querySelector('#show-pc ul')
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
        pc.addEventListener('click', displaypc)
    })

    document.getElementById("pcForm").addEventListener('click', displayCreateForm)
    document.getElementById("pcs").addEventListener('click', getPcs)
    document.querySelectoryAll("#delete").forEach(pc => pc.addEventListener('click, removePc'))
    document.querySelectoryAll("#update-pc").forEach(pc => pc.addEventListener('click, editPc'))
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

class Pd {
    constructor(pc) {
        this.id = pc.id
        this.name = pc.name
        this.description = todo.description 
        this.parts = pc.parts
    }

    renderPc() {
        return `
        <li id="pc-${this.id}>
                    <a href="#" data-id="${this.id}">${this.name}</a>
                    - ${this.description}
                    <ul id="parts">
                    </ul>
                    <button id="delete" data-id${this.id}>Delete</button>
                    <button id="update-pc" data-id${this.id}>Edit</button>
        </li>`
    }
    renderULs() {
        let ul = document.querySelector(`li#pc-${this.id} #parts`)
        this.parts.forEach(part => {
                ul.innerHTML += `<li>${part.name}</li>`
        })
    }
}