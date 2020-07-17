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
        <li data-id="${this.id}">${this.name}
        - ${this.description}</li>
        <br>
        <button id="partForm" data-id="${this.id}">Make part</button>
        <div id="part-form"></div>
        <ul id="parts">
        </ul>
        <button id="delete" data-id${this.id}>Delete</button>
        </li>`
    }
    renderULs() {
        let ul = document.querySelector(`ul#parts`)
        this.parts.forEach(part => {
            ul.innerHTML += `
            <li>Part: ${part.name} $${part.price}<button id="deletePart" data-id="${part.id}">Delete</button></li>
            `
        })
    }
}