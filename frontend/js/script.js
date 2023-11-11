const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');
const inputSolicitacao = document.querySelector('.input-solicitacao');

const fetchTasks = async()=>{
    const response = await fetch('http://localhost:3333/tasks')
    const tasks = await response.json()
    return tasks;
}


const addTask = async (event)=>{
    event.preventDefault()

    const task = {linha : inputTask.value , solicitacao : inputSolicitacao.value}

    await fetch('http://localhost:3333/tasks',{
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(task),
    });

    loadTasks();

    inputTask.value = '';

}

const deleteTask = async (id) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method : 'delete'
    })
    loadTasks()
}

const updateTask = async ({id,linha,status,}) =>{
    
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method : 'put',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify({linha,status})
    })

    loadTasks();
}

const formatDate = (dateUTC) =>{
    const options = {dateStyle: 'long' , timeStyle: 'short'}
    const date = new Date(dateUTC).toLocaleString('pt-br' , options);
    return date;
}

const createElement = (tag, innerText = '', innerHTML = '') =>{
    const element = document.createElement(tag)

    if(innerText){
        element.innerText = innerText
    }

    if(innerHTML){
        element.innerHTML = innerHTML
    }
    
    return element;
}

const createSelect = (value)=>{

    const options = `                            
        <option value="pendente">Pendente</option>
        <option value="ok">OK</option>
        `;
    const select = createElement('select','',options)

    select.value = value

    return select;
}

const createRow =(task)=>{

    const {id,linha,solicitacao,status,created_at} = task
    const tr = createElement('tr')
    const tdLinha = createElement('td', linha)
    const tdSolicitacao = createElement('td', solicitacao)
    const tdCreatedAt = createElement('td' , formatDate(created_at))
    const tdStatus = createElement('td')
    const tdActions = createElement('td')
    const select = createSelect(status)

    const editButton = createElement('button', '','<span class="material-symbols-outlined">edit</span>')
    const deleteButton = createElement('button' , '', '<span class="material-symbols-outlined">delete</span>')

    deleteButton.addEventListener('click', ()=> deleteTask(id))
    select.addEventListener('change', ({target})=> updateTask({...task ,status : target.value}))

    tdStatus.appendChild(select)

    editButton.classList.add('btn-action')
    deleteButton.classList.add('btn-action')

    const editForm = createElement('form')
    const editInput = createElement('input')

    editInput.value = linha
    editForm.appendChild(editInput)

    editForm.addEventListener('submit', (event)=>{
        event.preventDefault()

        updateTask({id , linha : editInput.value , solicitacao, status});
    })

    editButton.addEventListener('click', ()=>{
        tdLinha.innerText = ''
        tdLinha.appendChild(editForm)
    })

    tdActions.appendChild(editButton)
    tdActions.appendChild(deleteButton)

    tr.appendChild(tdLinha)
    tr.appendChild(tdSolicitacao)
    tr.appendChild(tdCreatedAt)
    tr.appendChild(tdStatus)
    tr.appendChild(tdActions)

    return tr;



    
}

const loadTasks = async () => {
    const tasks = await fetchTasks()

    tbody.innerHTML = ''

    tasks.forEach((task) => {

        const tr = createRow(task)
        tbody.appendChild(tr)
        
    });
}
addForm.addEventListener('submit',addTask);
loadTasks();