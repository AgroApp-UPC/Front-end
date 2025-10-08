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
  crops: any[] = [];
  harvestDate: any = { dayName: 'Tuesday', dayNumber: 16, harvests: [] };
  tasks: any[] = [];
  recommendations: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
   
    this.http.get<PreviewField[]>('http://localhost:3000/preview_fields').subscribe(data => {
      console.log('Crops del JSON:', data);
    this.crops = data.map(...);
      this.crops = data.map(field => ({
        id: field.id,
        nameKey: field.title.toUpperCase().replace(/ /g, '_'), 
        days: 31, 
        image: field.image_url
      }));
    });

  
    this.http.get<Field[]>('http://localhost:3000/fields').subscribe(data => {
      console.log('Fields del JSON:', data);
      this.harvestDate = {
        dayName: 'Tuesday',
        dayNumber: 16,
        harvests: data.slice(0, 2).map(field => ({
          id: field.id,
          when: field.planting_date, 
          locationKey: field.name, 
          cropKey: field.crop 
        }))
      };
    });

  
    this.http.get<UpcomingTask[]>('http://localhost:3000/upcoming_tasks').subscribe(data => {
      console.log('Tasks del JSON:', data);
      this.tasks = data.map(task => ({
        id: task.id,
        when: task.date === '07/10/2025' ? 'Today' : task.date,
        locationKey: task.name,
        nameKey: task.task.toUpperCase().replace(/ /g, '_'),
        completed: false
      }));
    });

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
  }
}
