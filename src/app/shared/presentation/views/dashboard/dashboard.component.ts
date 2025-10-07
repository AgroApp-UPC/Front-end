import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIconButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

interface PreviewField {
  id: number;
  image_url: string;
  title: string;
}

interface Field {
  id: number;
  name: string;
  planting_date: string;
  expecting_harvest: string;
  crop: string;
}

interface UpcomingTask {
  id: number;
  date: string;
  name: string;
  task: string;
}

interface Recommendation {
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatCheckbox,
    MatIconButton,
    TranslateModule,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  crops: any[] = []; // Se llenará del JSON
  harvestDate: any = { dayName: 'Tuesday', dayNumber: 16, harvests: [] }; // Se llenará del JSON
  tasks: any[] = []; // Se llenará del JSON
  recommendations: any[] = []; // Se llenará del JSON

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Crops: de preview_fields (5 items del JSON)
    this.http.get<PreviewField[]>('http://localhost:3000/preview_fields').subscribe(data => {
      this.crops = data.map(field => ({
        id: field.id,
        nameKey: field.title.toUpperCase().replace(/ /g, '_'), // e.g., "Campo de Granos, Los Grandes" → "CAMPO_DE_GRANOS,_LOS_GRANDES"
        days: 31, // Temporal; usa crop_fields.days si ensamblas
        image: field.image_url
      }));
    });

    // HarvestDate: de fields (toma primeros 2 para harvests)
    this.http.get<Field[]>('http://localhost:3000/fields').subscribe(data => {
      this.harvestDate = {
        dayName: 'Tuesday', // Hoy 07/10/2025 es martes
        dayNumber: 16,
        harvests: data.slice(0, 2).map(field => ({ // Primeros 2 como en tu hardcode
          id: field.id,
          when: field.planting_date, // e.g., '05/09'
          locationKey: field.name,
          cropKey: field.crop
        }))
      };
    });

    // Tasks: de upcoming_tasks (3 items del JSON, hoy 07/10/2025)
    this.http.get<UpcomingTask[]>('http://localhost:3000/upcoming_tasks').subscribe(data => {
      this.tasks = data.map(task => ({
        id: task.id,
        when: task.date === '07/10/2025' ? 'Today' : task.date, // Lógica para 'Today'
        locationKey: task.name,
        nameKey: task.task.toUpperCase().replace(/ /g, '_'), // e.g., "Urgent: Apply fungicide" → "URGENT:_APPLY_FUNGICIDE"
        completed: false // Init; cambia con toggle
      }));
    });

    // Recommendations: directo de recommendations (3 items del JSON)
    this.http.get<Recommendation[]>('http://localhost:3000/recommendations').subscribe(data => {
      this.recommendations = data.map(rec => ({
        id: rec.id,
        fieldKey: rec.title,
        adviceKey: rec.content
      }));
    });
  }

  toggleTask(task: any) {
    task.completed = !task.completed;
    // Opcional: Para persistir en JSON, agrega PATCH
    // this.http.patch(`http://localhost:3000/upcoming_tasks/${task.id}`, { completed: task.completed }).subscribe();
  }
}
