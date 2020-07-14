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
