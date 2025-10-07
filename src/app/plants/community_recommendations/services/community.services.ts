import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Community } from '../domain/model/community.entity'; // Asegúrate de que la ruta sea correcta
import { CommunityAssembler } from '../domain/model/community.assembler';
import {enviroment} from '../../../../enviroment/enviroment.development'; // Asegúrate de que la ruta sea correcta


@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  private communityUrl = enviroment.BASE_URL + enviroment.ENDPOINT_PATH_COMMUNITY_RECOMMENDATION;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las recomendaciones de la comunidad desde la API.
   * @returns Un Observable con un arreglo de instancias de Community.
   */
  getCommunityRecommendations(): Observable<Community[]> {
    return this.http.get<any[]>(this.communityUrl).pipe(
      map(response => {
        return CommunityAssembler.toEntitiesFromResponse(response);
      })
    );
  }
}
