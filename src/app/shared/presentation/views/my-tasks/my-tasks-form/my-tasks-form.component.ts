import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importaciones de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {Task} from '../../../../../plants/task/domain/model/task.entity';

@Component({
  selector: 'app-task-form',
  standalone: true,  // <--- ¡ESTA ES LA LÍNEA MÁS IMPORTANTE!
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './my-tasks-form.component.html',
  styleUrls: ['./my-tasks-form.component.css']
})
export class TaskFormComponent {
  // El resto del código del componente no cambia...
  @Output() taskCreated = new EventEmitter<Omit<Task, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  public newTask: Omit<Task, 'id'> = {
    description: '',
    due_date: '',
    field: ''
  };

  onSubmit(): void {
    if (this.newTask.description && this.newTask.due_date && this.newTask.field) {
      this.taskCreated.emit(this.newTask);
      this.newTask = { description: '', due_date: '', field: '' };
    } else {
      alert('Please fill all the fields');
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
