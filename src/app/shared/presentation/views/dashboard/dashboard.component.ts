import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIconButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

// Interfaces para JSON
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
  crops: any[] = [];
  harvestDate: any = { dayName: 'Tuesday', dayNumber: 16, harvests: [] };
  tasks: any[] = [];
  recommendations: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Crops: de preview_fields (5 campos del JSON)
    this.http.get<PreviewField[]>('http://localhost:3001/preview_fields').subscribe(data => {
      this.crops = data.map(field => ({
        id: field.id,
        nameKey: field.title.toUpperCase().replace(/ /g, '_'), // e.g., "Campo de Granos, Los Grandes" → "CAMPO_DE_GRANOS,_LOS_GRANDES"
        days: 31, // Temporal; cambia con assembler para días reales de crop_fields
        image: field.image_url
      }));
    });

    // HarvestDate: de fields (primeros 2)
    this.http.get<Field[]>('http://localhost:3001/fields').subscribe(data => {
      this.harvestDate = {
        dayName: 'Tuesday',
        dayNumber: 16,
        harvests: data.slice(0, 2).map(field => ({
          id: field.id,
          when: field.planting_date, // e.g., '05/09'
          locationKey: field.name, // e.g., 'Campo de Granos, Los Grandes'
          cropKey: field.crop // e.g., 'Trigo'
        }))
      };
    });

    // Tasks: de upcoming_tasks (3 tareas del JSON)
    this.http.get<UpcomingTask[]>('http://localhost:3001/upcoming_tasks').subscribe(data => {
      this.tasks = data.map(task => ({
        id: task.id,
        when: task.date === '07/10/2025' ? 'Today' : task.date,
        locationKey: task.name,
        nameKey: task.task.toUpperCase().replace(/ /g, '_'),
        completed: false
      }));
    });

    // Recommendations: de recommendations (3 items del JSON)
    this.http.get<Recommendation[]>('http://localhost:3001/recommendations').subscribe(data => {
      this.recommendations = data.map(rec => ({
        id: rec.id,
        fieldKey: rec.title, // e.g., 'Revisión de Riego'
        adviceKey: rec.content // e.g., 'Cosechar antes de 15/11/2025'
      }));
    });
  }

  toggleTask(task: any) {
    task.completed = !task.completed;
  }
}
