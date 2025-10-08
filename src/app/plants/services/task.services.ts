// src/app/plants/services/task.services.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../domain/model/task.entity';
import { TaskAssembler } from '../domain/model/task.assembler';
import {enviroment} from '../../../enviroment/enviroment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // 2. Construye la URL dinámicamente
  private taskUrl = enviroment.BASE_URL + enviroment.ENDPOINT_PATH_TASK;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    // 3. Usa la nueva URL completa
    return this.http.get<any[]>(this.taskUrl).pipe( // json-server no envuelve la respuesta en un objeto {task: []}
      map(response => {
        // El assembler ahora recibe directamente el array
        return TaskAssembler.toEntitiesFromResponse(response);
      })
    );
  }
}
