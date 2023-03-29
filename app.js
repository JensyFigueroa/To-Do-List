const formulario = document.getElementById('formulario');
const input = document.querySelector('input')
const boxList = document.getElementById('boxList');
const template = document.getElementById('template').content;
const fragment = document.createDocumentFragment();

let collectionToDo = {};
let id = 0;

/* El DOMContentLoaded es por si hay algo en collectionToDo 
lo muestre al momento de cargar el html */
document.addEventListener('DOMContentLoaded', ()=>{
    showToDo()
})

formulario.addEventListener('submit', e =>{
    e.preventDefault();
    /***** Formas de capturar info de un formulario *****/
    /* console.log('procesando formulario...');
    console.log(e.target[0].value);
    console.log(e.target.querySelector('input').value)
    console.log(input.value) */
    addToDo(e)
})

boxList.addEventListener('click', (e) =>{
    btnAction(e)
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
        toDo: input.value,
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
    boxList.innerHTML = '';
    Object.values(collectionToDo).forEach( etoDo =>{
        //  console.log(etoDo.toDo)
        const clone = template.cloneNode(true);
        // console.log(clone)
        clone.querySelector('p').textContent = etoDo.toDo;

        if (etoDo.state) {
            clone.querySelector('.listToDo').classList.replace('colorWarning','colorDanger')
            console.log('dentro del if')
            clone.querySelectorAll('.fa-solid')[0].classList.replace('fa-circle-check','fa-rotate-right');
            clone.querySelector('p').style.textDecoration = 'Line-through'
            
        }

        clone.querySelectorAll('.fa-solid')[0].dataset.id = etoDo.id;
        clone.querySelectorAll('.delete')[0].dataset.id = etoDo.id;
       
        fragment.appendChild(clone)
    })

    boxList.append(fragment)
}

const btnAction = (e) => {
//  console.log(e.target.classList.contains('check'))
    if (e.target.classList.contains('fa-circle-check')) {
        collectionToDo[e.target.dataset.id].state = true;
        showToDo()
        // console.log(collectionToDo)
    }
    if (e.target.classList.contains('delete')) {
        delete collectionToDo[e.target.dataset.id]
        showToDo()
        // console.log(collectionToDo)
    }

    if (e.target.classList.contains('fa-rotate-right')) {
        collectionToDo[e.target.dataset.id].state = false;
        showToDo()
    }

    /* Activa solo los eventos que se encuentren dentro este contendor  */
    e.stopPropagation()
}
