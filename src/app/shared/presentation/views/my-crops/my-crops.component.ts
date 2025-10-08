import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CropFormComponent} from './my-crops-form/my-crops-form.component';
import {Crop} from '../../../../plants/crop/domain/model/crop.entity';
import {CropService} from '../../../../plants/crop/services/crop.services';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-my-crops',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    //CropFormComponent,
    TranslatePipe,
    CropFormComponent
  ],
  templateUrl: './my-crops.component.html',
  styleUrls: ['./my-crops.component.css']
})
export class MyCropsComponent implements OnInit {

  private cropsSubject = new BehaviorSubject<Crop[]>([]);
  public crops$: Observable<Crop[]> = this.cropsSubject.asObservable();
  public showNewCropForm = false;

  constructor(
    private cropService: CropService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cropService.getCrops().subscribe(crops => {
      this.cropsSubject.next(crops);
      this.cdr.detectChanges();
    });
  }

  handleCropCreated(newCrop: Omit<Crop, 'id'>): void {
    this.cropService.createCrop(newCrop).subscribe({
      next: (createdCrop) => {
        const currentCrops = this.cropsSubject.getValue();
        this.cropsSubject.next([...currentCrops, createdCrop]);
        this.cdr.detectChanges();
        this.showNewCropForm = false;
      },
      error: (err) => console.error('Error creating crop', err)
    });
  }

  //MÉTODO PARA BORRAR (RESTAURADO)
  deleteCrop(id: number, event: Event): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this crop?')) {
      this.cropService.deleteCrop(id).subscribe({
        next: () => {
          const updatedCrops = this.cropsSubject.getValue().filter(crop => crop.id !== id);
          this.cropsSubject.next(updatedCrops);
          this.cdr.detectChanges();
        },
        error: (err) => console.error(`Error deleting crop ${id}`, err)
      });
    }
  }

  // --- MÉTODO PARA EDITAR (RESTAURADO) ---
  editCrop(crop: Crop, event: Event): void {
    event.stopPropagation();
    const newTitle = prompt('Enter the new title:', crop.title);
    if (newTitle && newTitle !== crop.title) {
      const updatedCropData = { ...crop, title: newTitle };
      this.cropService.updateCrop(updatedCropData).subscribe({
        next: (responseCrop) => {
          const updatedCrops = this.cropsSubject.getValue().map(c => c.id === responseCrop.id ? responseCrop : c);
          this.cropsSubject.next(updatedCrops);
          this.cdr.detectChanges();
        },
        error: (err) => console.error(`Error updating crop ${crop.id}`, err)
      });
    }
  }
}

