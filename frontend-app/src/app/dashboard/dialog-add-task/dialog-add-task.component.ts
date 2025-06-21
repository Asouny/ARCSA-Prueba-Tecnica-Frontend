import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss'],
})
export class DialogAddTaskComponent {
  taskForm = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    estatus: ['pendiente', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private dialogRef: MatDialogRef<DialogAddTaskComponent>
  ) {}

  onSubmit() {
    if (this.taskForm.valid) {
      this.dashboardService.createTarea(this.taskForm.value).subscribe({
        next: () => {
          alert('Tarea creada exitosamente');
          this.dialogRef.close(true); // Notifica que se agregó
        },
        error: (err: { error: { message: any } }) => {
          alert(err.error?.message || 'Error al crear la tarea');
          console.error(err);
        },
      });
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
