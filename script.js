document.addEventListener('DOMContentLoaded', () => {

    const InputText = document.getElementById('input-text'); /* acces all input's, btn, display output*/
    const AddTaskBtn = document.getElementById('add-task');
    const TaskList = document.getElementById('task-list');


    const ProgressBar=document.getElementById('Progress');
    const ProgressNum=document.getElementById('number');

    const EmptyImg = document.querySelector('.empty');

    const toDoContainer = document.querySelector('.to-do-container');

    const ToggleEmptyState = () => { /* check the state of img empty or not */
        EmptyImg.style.display = TaskList.children.length === 0 ? 'block' : 'none';
        toDoContainer.style.width = TaskList.children.length > 0 ? '100%' : '50%';
        /* and remove the img from block */
    };

  const UpdateProgress = (checkCompletion = true) => {
    const totalTask = TaskList.children.length;
    const CompletedTask = TaskList.querySelectorAll('.checkbox:checked').length;

    if (totalTask === 0) {
        ProgressBar.style.width = "0%";
    } else {
        const progress = (CompletedTask / totalTask) * 100;
        ProgressBar.style.width = `${progress}%`;
    }

      ProgressNum.textContent = `${CompletedTask}/${totalTask}`;
};


    const AddTask = (text, completed=false,checkCompletion=true) => { /* to add task */

        event.preventDefault();

        const TaskText =text || InputText.value.trim(); /* store enterd value and trim the unnassary space */
        if (!TaskText) { /* if no input is added then stop here */
            return;
        }

        const li = document.createElement('li'); /* dynamically create an li item element */
        /* li.textContent=TaskText; */ /* added input teext into list */

        /* created an html element inside js*/
        li.innerHTML = ` 
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}/>
            <span id=task>${TaskText}</span>

            <div class="task-btn">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        li.querySelector('.delete-btn').addEventListener('click',()=>{
            li.remove();
            ToggleEmptyState();
            UpdateProgress();
        });

        const checkbox=li.querySelector('.checkbox');

        if(completed){
            li.classList.add('completed');
            editBtn.disable=true;
            editBtn.style.opacity='0.5';
            editBtn.style.pointerEvents='none';
        }

        checkbox.addEventListener('change',()=>{
            const isChecked=checkbox.checked;
            li.classList.toggle('completed',isChecked);
            editBtn.disable=isChecked;
            editBtn.style.opacity=isChecked ? '0.5':'1';
            editBtn.style.pointerEvents=isChecked ? 'none' :'auto';
            UpdateProgress();
        });


        const editBtn=li.querySelector('.edit-btn');

        editBtn.addEventListener('click',() =>{
                if(!checkbox.checked){
                  InputText.value=li.querySelector('span').textContent;  
                  li.remove();
                  ToggleEmptyState();
                  UpdateProgress(false);
                }
        });

        TaskList.appendChild(li); /* display the new task*/
        InputText.value = ''; /* allow to add new task */
        ToggleEmptyState();
        UpdateProgress(checkCompletion);

    };

    AddTaskBtn.addEventListener('click', ()=> AddTask()); /* when btn is click then call the "AddTask() function */

    InputText.addEventListener('keypress', (e) => { /* it tell the code run only when the keyboard "enter" key is pressed not + key */
        if (e.key === 'Enter') {
            AddTask();
        }
    });

    /* clock */
    const hrs=document.getElementById('hrs');
    const min=document.getElementById('min');
    const sec=document.getElementById('sec');


    setInterval(()=>{
        const CurrentTime= new Date();

        hrs.innerHTML=(CurrentTime.getHours()<10?"0":"") + CurrentTime.getHours();
        min.innerHTML=(CurrentTime.getMinutes()<10?"0":"") + CurrentTime.getMinutes();
        sec.innerHTML=(CurrentTime.getSeconds()<10?"0":"") + CurrentTime.getSeconds();

    },1000)

    


});