// src/app/plants/domain/model/task.assembler.ts

import { Crop } from './crop.entity'; // Asegúrate que el import sea correcto

export class CropAssembler {

  /**
   * Convierte un recurso de datos crudos a una instancia de Task.
   */
  public static toEntityFromResource(resource: any): Crop {
    const crop = new Crop();
    crop.id = resource.id;
    crop.title = resource.title;
    crop.planting_date = resource.planting_date;
    crop.harvest_date = resource.harvest_date;
    crop.field = resource.field;
    crop.status = resource.status;
    return crop;
  }

  /**
   * CORREGIDO: Convierte un array de recursos directamente a un array de Tasks.
   * Ya no espera un objeto contenedor.
   */
  public static toEntitiesFromResponse(response: any[]): Crop[] { // Recibe un array directamente
    // Mapea el array 'response' directamente
    return response.map(resource => this.toEntityFromResource(resource));
  }
}
