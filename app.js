const formulario = document.getElementById('formulario');
const input = document.querySelector('input')
const listToDo = document.getElementById('listToDo');
const template = document.getElementById('template');
const fragment = document.createDocumentFragment();

let collectionToDo = {};
let id = 0;

formulario.addEventListener('submit', e =>{
    e.preventDefault();
    /***** Formas de capturar info de un formulario *****/
    /* console.log('procesando formulario...');
    console.log(e.target[0].value);
    console.log(e.target.querySelector('input').value)
    console.log(input.value) */

    addToDo(e)
})

const addToDo = (e) =>{
    /* Evaluamos si el input no esta vacio */
    if (input.value.trim() === '') {
        // console.log('el campo esta vacio')
        alert('you must enter a task')
        input.focus()
        return
    }

    const toDo = {
        id: ++id,
        toDo: e.target[0].value,
        state: false
    }
   
    collectionToDo[toDo.id] = toDo;
    // console.log(collectionToDo)

    // console.log('diste click')

    formulario.reset();
    input.focus();

    showToDo()
}

const showToDo = () =>{
    listToDo.innerHTML = '';
    Object.values(collectionToDo).forEach( etoDo =>{
        // console.log(toDo)
        const clone = template.cloneNode(true);
        // console.log(clone)
        clone.querySelector('p').textContent = etoDo.toDo
        fragment.appendChild(clone)
    })

    listToDo.appendChild(fragment)
}
