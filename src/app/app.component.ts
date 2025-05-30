import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'miProyecto';
  actividadForm: FormGroup;
  months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  constructor(private fb: FormBuilder) {
    this.actividadForm = this.fb.group({
      denominacion: ['', Validators.required],
      year: [2025, Validators.required],
      selectedMonths: this.fb.array([], Validators.minLength(1))
    });
  }

  toggleMonth(month: string): void {
    const monthsArray = this.actividadForm.get('selectedMonths') as FormArray;
    const index = monthsArray.value.indexOf(month);
    
    if (index === -1) {
      monthsArray.push(this.fb.control(month));
    } else {
      monthsArray.removeAt(index);
    }
  }

  isMonthSelected(month: string): boolean {
    return this.actividadForm.value.selectedMonths.includes(month);
  }

  onSubmit(): void {
    if (this.actividadForm.valid) {
      console.log('Formulario válido:', this.actividadForm.value);
      // Lógica de envío aquí
    } else {
      this.actividadForm.markAllAsTouched();
    }
  }
}
