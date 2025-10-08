import {ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Importaciones de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {Crop} from '../../../../../plants/crop/domain/model/crop.entity';
import {MatCard, MatCardContent} from '@angular/material/card';
import {TranslatePipe} from '@ngx-translate/core';
import { Field} from '../../../../../plants/field/domain/model/field.entity';

import {HttpClient} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {BehaviorSubject, Observable} from 'rxjs';
import {CropService} from '../../../../../plants/crop/services/crop.services';
import {FieldService} from '../../../../../plants/field/services/field.services';
import {MatIcon} from '@angular/material/icon';
import {enviroment} from '../../../../../../enviroment/enviroment.development';
import {map} from 'rxjs/operators';
import {FieldAssembler} from '../../../../../plants/field/domain/model/field.assembler';

@Component({
  selector: 'app-crop-form',
  standalone: true,  // <--- ¡ESTA ES LA LÍNEA MÁS IMPORTANTE!
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCard,
    MatIcon
  ],
  templateUrl: './my-crops-form.component.html',
  styleUrls: ['./my-crops-form.component.css']
})
export class CropFormComponent {
  // El resto del código del componente no cambia...
  @Output() cropCreated = new EventEmitter<Omit<Crop, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  private fieldsSubject = new BehaviorSubject<Field[]>([]);
  public fields$: Observable<Field[]> = this.fieldsSubject.asObservable();
  constructor(
    private fieldService: FieldService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.fieldService.getFields().subscribe(fields => {
      this.fieldsSubject.next(fields);
      this.cdr.detectChanges();
    });
  }
  statuses: string[] = ['Critical', 'Attention', 'Healthy'];

  public newCrop: Omit<Crop, 'id'> = {
    title: '',
    days: '',
    planting_date: '',
    harvest_date: '',
    field: '',
    status: ''
  };

  onSubmit(): void {
    if (this.newCrop.title && this.newCrop.planting_date && this.newCrop.harvest_date && this.newCrop.status) {
      this.cropCreated.emit(this.newCrop);
      this.newCrop = { title: '', days: '', planting_date: '', harvest_date: '', field: '', status: '' };
    } else {
      alert('Please fill all the fields');
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
