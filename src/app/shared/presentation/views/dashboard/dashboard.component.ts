import { Component, OnInit } from '@angular/core'; // Agrega OnInit aquí
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
    this.crops = data.map(field => ({
      id: field.id,
      name: field.title, 
      nameKey: field.title.toUpperCase().replace(/ /g, '_'), 
      days: 31,
      image: field.image_url
    }));
  });


  this.http.get<Field[]>('http://localhost:3000/fields').subscribe(data => {
    this.harvestDate = {
      dayName: 'Tuesday',
      dayNumber: 16,
      harvests: data.slice(0, 2).map(field => ({
        id: field.id,
        when: field.planting_date,
        location: field.name, 
        locationKey: field.name.toUpperCase().replace(/ /g, '_'), 
        crop: field.crop, 
        cropKey: field.crop.toUpperCase(), 
      }))
    };
  });


  this.http.get<UpcomingTask[]>('http://localhost:3000/upcoming_tasks').subscribe(data => {
    this.tasks = data.map(task => ({
      id: task.id,
      when: task.date === '07/10/2025' ? 'Today' : task.date,
      location: task.name, 
      locationKey: task.name.toUpperCase().replace(/ /g, '_'), 
      name: task.task, 
      nameKey: task.task.toUpperCase().replace(/ /g, '_'), 
      completed: false
    }));
  });

 
  this.http.get<Recommendation[]>('http://localhost:3000/recommendations').subscribe(data => {
    this.recommendations = data.map(rec => ({
      id: rec.id,
      field: rec.title, 
      fieldKey: rec.title.toUpperCase().replace(/ /g, '_'),
      advice: rec.content, 
      adviceKey: rec.content.toUpperCase().replace(/ /g, '_'), 
    }));
  });
}
  toggleTask(task: any) {
    task.completed = !task.completed;
  }
}
