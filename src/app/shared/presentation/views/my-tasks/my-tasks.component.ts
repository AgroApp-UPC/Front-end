import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {TaskFormComponent} from './my-tasks-form/my-tasks-form.component';
import {Task} from '../../../../plants/task/domain/model/task.entity';
import {TaskService} from '../../../../plants/task/services/task.services';
import {TranslatePipe} from '@ngx-translate/core';


@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    TaskFormComponent,
    TranslatePipe
  ],
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$: Observable<Task[]> = this.tasksSubject.asObservable();
  public showNewTaskForm = false;

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasksSubject.next(tasks);
      this.cdr.detectChanges();
    });
  }

  handleTaskCreated(newTask: Omit<Task, 'id'>): void {
    this.taskService.createTask(newTask).subscribe({
      next: (createdTask) => {
        const currentTasks = this.tasksSubject.getValue();
        this.tasksSubject.next([...currentTasks, createdTask]);
        this.cdr.detectChanges();
        this.showNewTaskForm = false;
      },
      error: (err) => console.error('Error creating task', err)
    });
  }

  // --- MÉTODO PARA BORRAR (RESTAURADO) ---
  deleteTask(id: number, event: Event): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          const updatedTasks = this.tasksSubject.getValue().filter(task => task.id !== id);
          this.tasksSubject.next(updatedTasks);
          this.cdr.detectChanges();
        },
        error: (err) => console.error(`Error deleting task ${id}`, err)
      });
    }
  }

  // --- MÉTODO PARA EDITAR (RESTAURADO) ---
  editTask(task: Task, event: Event): void {
    event.stopPropagation();
    const newDescription = prompt('Enter the new description:', task.description);
    if (newDescription && newDescription !== task.description) {
      const updatedTaskData = { ...task, description: newDescription };
      this.taskService.updateTask(updatedTaskData).subscribe({
        next: (responseTask) => {
          const updatedTasks = this.tasksSubject.getValue().map(t => t.id === responseTask.id ? responseTask : t);
          this.tasksSubject.next(updatedTasks);
          this.cdr.detectChanges();
        },
        error: (err) => console.error(`Error updating task ${task.id}`, err)
      });
    }
  }
}
