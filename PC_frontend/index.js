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