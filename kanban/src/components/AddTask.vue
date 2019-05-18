<template>
  <button style="margin-left: 10px" class="btn btn-dark" @click="addnewtask"><i class="fas fa-tasks" style="margin-right: 5px"></i>  Add New Task</button>
</template>

<script>
  import Swal from 'sweetalert2'
  import db from '@/api/firebase'


  export default {
    name: 'AddTask',
    methods: {
      addnewtask() {
        Swal.fire({
          title: 'Add New Task',
          showCancelButton: true,
          html: '<input id="todoname" class="swal2-input" placeholder="your task here.." aria-required>' +
            '<input id="priority" class="swal2-input" placeholder="on scale 1-10, what is priority level of this task?">' +
            '<input id="assignedto" class="swal2-input" placeholder="whom is this task assigned to..">' +
            '<textarea id="description" type="textarea" class="swal2-input" placeholder="brief description of this task.."></textarea>',
          focusConfirm: false,
          preConfirm: () => {
            let formValues = {
              todoname: document.getElementById('todoname').value,
              priority: document.getElementById('priority').value,
              assignedto: document.getElementById('assignedto').value,
              description: document.getElementById('description').value,
              createdAt: new Date(),
              status: 'Back Log'
            }
            let a = Object.values(formValues)
            console.log(a,'============================')
            let b = a.filter(el => el.length === 0)
            console.log(b,'============================')
            if(b[0] === ""){
              Swal.fire({
                title: 'Error',
                type: 'error',
                text: 'you have to fill all fields!'
              })
              throw new Error('field empty')
            }
            
            db.collection("tasks").add({
                todoname: formValues.todoname,
                priority: formValues.priority,
                assignedto: formValues.assignedto,
                description: formValues.description,
                createdAt: formValues.createdAt,
                status: formValues.status
              })
              .then((result) => {
                Swal.fire({
                  title: 'New task has been added with detail: ',
                  type: 'success',
                  text:
                    `
                    Task: ${formValues.todoname}; 
                    Priority: ${formValues.priority}; 
                    Assigned To: ${formValues.assignedto}; 
                    Description: ${formValues.description}; 
                    Created At: ${formValues.createdAt}; 
                    Status: ${formValues.status}; 
                    `
                })
              })
              .catch((err) => {
                console.log(err.message)
              })
            console.log(formValues)
          }
        })

      }
    }
  }

</script>
  textarea{}
<style>

</style>
