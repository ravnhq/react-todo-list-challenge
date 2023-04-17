let storedTodos : string | null  

function validateTodoForm(values: TodoData): TodoFormErrors {
    const errors: TodoFormErrors = {};
  
    if (values.description.length===0) {
      errors.description = 'TODO name is required';
    }
  
    return errors;
  }

const refreshLocalStorage = (todos : TodoData[]) : void => {
    localStorage.setItem("todos", JSON.stringify(todos))
    storedTodos=JSON.stringify(todos)
} 

const removeTodo = (item : any) : void => {
    const savedTodos: TodoData[] = JSON.parse(storedTodos)
    const index = savedTodos.findIndex(obj => String(obj.id) === item.target.id)
    savedTodos.splice(index, 1)
    refreshLocalStorage(savedTodos)
    loadAllTodos()
}

const processCheckbox = (item : any ) : void => {
    const savedTodos: TodoData[] = JSON.parse(storedTodos)
    const updateTodo = savedTodos.find((obj) => String(obj.id) === item.target.id)
    updateTodo.status = item.target.checked
    refreshLocalStorage(savedTodos)
    loadAllTodos()
}

const configureEvents = () : void =>{
    const checkBoxes=document.querySelectorAll('ul > li > input[type="checkbox"')
    const removeButtons=document.querySelectorAll('ul > li > button')

    checkBoxes.forEach((item)=>{
        item.addEventListener('click', (element) =>{
            processCheckbox(element)
        })
    })

    removeButtons.forEach((item)=>{
        item.addEventListener('click', (element) =>{
            removeTodo(element)
        })
    })
}

const loadAllTodos  = () : void =>{
    const pendingTodoList=document.querySelector('#pending-todo-list')
    const doneTodoList=document.querySelector('#done-todo-list')
    const doneCounter=document.querySelector('#done-span')
    const allCounter=document.querySelector('#all-span')

    if(pendingTodoList != undefined)
        pendingTodoList.innerHTML=''
    if(doneTodoList != undefined)
        doneTodoList.innerHTML=''
    storedTodos=localStorage.getItem('todos')
    if (storedTodos) {
        const savedTodos: TodoData[] = JSON.parse(storedTodos)
        let done=0;
        savedTodos.forEach(item =>{
            const newTodo = document.createElement('li')
            const checkBoxTodo = document.createElement('input')
            const labelTodo = document.createElement('label')
            const removeTodo = document.createElement('button')

            labelTodo.textContent=item.description
            removeTodo.textContent='X'
            removeTodo.className='remove-todo'
            removeTodo.id=String(item.id)
            checkBoxTodo.type = 'checkbox'
            checkBoxTodo.id=String(item.id)
            checkBoxTodo.checked=item.status
            newTodo.appendChild(checkBoxTodo)
            newTodo.appendChild(labelTodo)
            newTodo.appendChild(removeTodo)

            if(item.status){
                doneTodoList.appendChild(newTodo)
                done++
            }
            else{
                pendingTodoList.appendChild(newTodo)
            }
        })
        doneCounter.textContent=String(done);
        allCounter.textContent=String(savedTodos.length)
        configureEvents()
    }
} 

const removeAllTodos = () : void =>{
    localStorage.clear() //Clearing the local storage 
    localStorage.setItem("todos", JSON.stringify([])) //adding an empty todos array 
    loadAllTodos()
}

const removeDoneTodos = () : void => {
    const savedTodos: TodoData[] = JSON.parse(storedTodos)
    const updateTodos = savedTodos.filter((obj) => String(obj.status) === 'false')
    refreshLocalStorage(updateTodos)
    loadAllTodos()
}

const configureDeleteButtons = () : void =>{
    const removeDoneBtn=document.querySelector('#remove-done-btn')
    const removeAllBtn=document.querySelector('#remove-all-btn')

    removeDoneBtn.addEventListener('click',function(){
        removeDoneTodos()
    })
  
    removeAllBtn.addEventListener('click',function(){
        removeAllTodos()
    })
 
}

const formLoader = () : void =>{
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const savedTodos: TodoData[] = JSON.parse(storedTodos)
      const nameTodo = document.querySelector('#todo-name') as HTMLInputElement;
    
      const formData :TodoData = {
        description: nameTodo.value,
        id: savedTodos.length+1,
        status:false
      };
      const errors = validateTodoForm(formData);
    
        if (Object.keys(errors).length === 0) {
            savedTodos.push(formData)
            nameTodo.value=''
            refreshLocalStorage(savedTodos)
            loadAllTodos()
        } else {
            alert(errors.description)
        }
    
    });
}

const init  = () : void =>{
    if(localStorage.length === 0)
        refreshLocalStorage([])
    formLoader()
    loadAllTodos()  
    configureDeleteButtons()
}

init()

