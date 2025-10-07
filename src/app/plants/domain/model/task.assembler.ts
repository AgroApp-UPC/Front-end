// src/app/plants/domain/model/task.assembler.ts

import { Task } from './task.entity'; // Asegúrate que el import sea correcto

export class TaskAssembler {

  /**
   * Convierte un recurso de datos crudos a una instancia de Task.
   */
  public static toEntityFromResource(resource: any): Task {
    const task = new Task();
    task.id = resource.id;
    task.description = resource.description;
    task.due_date = resource.due_date;
    task.field = resource.field;
    return task;
  }

  /**
   * CORREGIDO: Convierte un array de recursos directamente a un array de Tasks.
   * Ya no espera un objeto contenedor.
   */
  public static toEntitiesFromResponse(response: any[]): Task[] { // Recibe un array directamente
    // Mapea el array 'response' directamente
    return response.map(resource => this.toEntityFromResource(resource));
  }
}
