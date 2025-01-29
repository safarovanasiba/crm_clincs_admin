import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CalendarOptions } from 'fullcalendar';
import { MessageService } from 'primeng/api';
import { PickListMoveToSourceEvent } from 'primeng/picklist';
import dayGridPlugin from '@fullcalendar/daygrid';

export interface ITask {
    id: number,
    name: string,
    descripition: string,
    assignee: string,
    createdOn: Date,
    status: string,
  }

  interface CalendarEvent {
    date: Date;
    title: string;
    description: string;
  }
  

@Component({
    templateUrl: './filedemo.component.html',
    providers: [MessageService]
})
export class FileDemoComponent {

    uploadedFiles: any[] = [];
    calendarOptions: CalendarOptions = {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      weekends: false,
      events: [
        { title: 'Meeting', start: new Date() }
      ]
    };
    
    events: any[] = [];
  display: boolean = false;
  eventForm: FormGroup;

  handleDateClick(e) {
    this.eventForm.reset();
    this.eventForm.patchValue({ date: e.dateStr });
    this.display = true;
  }

  saveEvent() {
    
    const newEvent = {
      title: this.eventForm.value.title,
      start: this.eventForm.value.date,
      description: this.eventForm.value.description,
      allDay: true
    };
    this.events.push(newEvent);
    this.display = false;
  }
    constructor(private messageService: MessageService, private fb: FormBuilder) {
      this.eventForm = this.fb.group({
        title: [''],
        date: [new Date()],
        description: ['']
      });
    }

    onUpload(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }

    onBasicUpload() {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }


    columns = [
        {
          name: 'To Do',
          tasks: [
            { id: 1, title: 'Task 1', description: 'Description for Task 1' },
            { id: 2, title: 'Task 2', description: 'Description for Task 2' }
          ]
        },
        {
          name: 'In Progress',
          tasks: [
            { id: 3, title: 'Task 3', description: 'Description for Task 3' }
          ]
        },
        {
          name: 'Done',
          tasks: [
            { id: 4, title: 'Task 4', description: 'Description for Task 4' }
          ]
        }
      ];
    
      onDrop(event: CdkDragDrop<any[]>) {
        // Check if both containers are defined and have data
        if (event.previousContainer && event.container) {
          const previousContainer = event.previousContainer as any;
          const currentContainer = event.container as any;

          console.log({event})
          console.log({previousContainer, currentContainer})
    
          // Ensure that data is an array
          if (Array.isArray(previousContainer) && Array.isArray(currentContainer)) {
            const previousIndex = event.previousIndex;
            const currentIndex = event.currentIndex;
    
            // Moving item within the same column
            if (event.container === event.previousContainer) {
              const [movedTask] = previousContainer.splice(previousIndex, 1);
              currentContainer.splice(currentIndex, 0, movedTask);
            } 
            // Moving item between columns
            else {
              const [movedTask] = previousContainer.splice(previousIndex, 1);
              currentContainer.splice(currentIndex, 0, movedTask);
            }
          } else {
            console.error('Container data is not an array');
          }
        } else {
          console.error('Previous or current container is undefined');
        }
      }




















      public type = '';
      public draggedTask: any;
      public todos: ITask[] = [
        {
          id: 1,
          name: 'Set up theme',
          descripition: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
          assignee: 'John Doe',
          createdOn: new Date(),
          status: 'TODO',
        },
        {
          id: 2,
          name: 'Develop layout',
          descripition: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
          assignee: 'Will Smith',
          createdOn: new Date(),
          status: 'TODO',
        },
        {
          id: 3,
          name: 'Develop Auth Module',
          descripition: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
          assignee: 'James Aninston',
          createdOn: new Date(),
          status: 'TODO',
        },
      ];
    
      public inProgress = [
        {
          id: 4,
          name: 'Develop layout',
          descripition: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
          assignee: 'Will Smith',
          createdOn: new Date(),
          status: 'InProgress',
        },
        {
          id: 5,
          name: 'Develop layout',
          descripition: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
          assignee: 'Will Smith',
          createdOn: new Date(),
          status: 'InProgress',
        },
      ];
      public completed = [
        {
          id: 6,
          name: 'Develop layout',
          descripition: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
          assignee: 'John Doe',
          createdOn: new Date(),
          status: 'Completed',
        },
      ];
    
      dragStart(task: ITask) {
        this.draggedTask = task;
      }
    
      drop(type: string) {
        switch (type) {
          case 'TODO':
            this.type = 'TODO';
            return this.todos.push(this.draggedTask);
          case 'InProgress':
            this.type = 'InProgress';
            return this.inProgress.push(this.draggedTask);
          case 'Completed':
            this.type = 'Completed';
            return this.completed.push(this.draggedTask);
          default :
            return false
        }
      }
    
      dragEnd(task: ITask) {
        const taskStatus = task.status;
        const taskId = task.id;
        if(this.type == 'TODO'){
          task.status = 'TODO'
        } else if (this.type === 'InProgress'){
          task.status = 'InProgress'
        } else {
          task.status = 'Completed'
        }
        
        switch (taskStatus) {
          case 'TODO':
            this.todos = this.todos.filter((task) => task.id != taskId);
            this.draggedTask = null;
            break;
          case 'InProgress':
             this.inProgress = this.inProgress.filter((task) => task.id != taskId);
             this.draggedTask = null;
             break
          case 'Completed':
            this.completed = this.completed.filter((task) => task.id != taskId);
            this.draggedTask = null;
            break
          default:
            ;
        }
      }
}
