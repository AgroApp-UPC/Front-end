import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIconButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

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
export class DashboardComponent {
  crops = [
    {
      id: 1,
      nameKey: 'TOMATO',
      days: 15,
      image: 'https://images.unsplash.com/photo-1592921870789-04563d55041c?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      nameKey: 'LETTUCE',
      days: 28,
      image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      nameKey: 'CARROT',
      days: 58,
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      nameKey: 'WHEAT',
      days: 20,
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      nameKey: 'CACAO',
      days: 80,
      image: 'https://images.unsplash.com/photo-1606312619070-d48b4ede6d91?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      nameKey: 'COFFEE',
      days: 63,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop'
    }
  ];

  harvestDate = {
    dayName: 'Tuesday',
    dayNumber: 16,
    harvests: [
      {
        id: 1,
        when: 'Today',
        locationKey: 'PARCELA_SAN_JOSE',
        cropKey: 'CARROT'
      },
      {
        id: 2,
        when: 'Tomorrow',
        locationKey: 'FUNDO_LOS_PINOS',
        cropKey: 'CACAO'
      }
    ]
  };

  tasks = [
    {
      id: 1,
      when: 'Today',
      locationKey: 'PARCELA_SAN_JOSE',
      nameKey: 'WATER_MAIZE',
      completed: true
    },
    {
      id: 2,
      when: 'In 2 days',
      locationKey: 'PARCELA_SAN_JOSE',
      nameKey: 'FERTILIZE_POTATOES',
      completed: false
    },
    {
      id: 3,
      when: '25/09',
      locationKey: 'FUNDO_SANTA_ROSA',
      nameKey: 'PEST_INSPECTION_TOMATO',
      completed: false
    }
  ];

  recommendations = [
    {
      id: 1,
      fieldKey: 'POTATO_FIELD',
      adviceKey: 'POTATO_ADVICE'
    },
    {
      id: 2,
      fieldKey: 'MAIZE_FIELD',
      adviceKey: 'MAIZE_ADVICE'
    },
    {
      id: 3,
      fieldKey: 'TOMATO_FIELD',
      adviceKey: 'TOMATO_ADVICE'
    }
  ];
}
