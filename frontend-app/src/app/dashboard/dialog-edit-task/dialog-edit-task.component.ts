import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dialog-edit-task',
  templateUrl: './dialog-edit-task.component.html',
  styleUrls: ['./dialog-edit-task.component.scss'],
})
export class DialogEditTaskComponent {
  taskForm = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    estatus: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private dialogRef: MatDialogRef<DialogEditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Prellenar el form con los datos
    this.taskForm.patchValue({
      titulo: data.titulo,
      descripcion: data.descripcion,
      estatus: data.estatus,
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.dashboardService
        .updateTarea(this.data.id, this.taskForm.value)
        .subscribe({
          next: () => {
            alert('Tarea actualizada exitosamente');
            this.dialogRef.close(true);
          },
          error: (err: { error: { message: any } }) => {
            alert(err.error?.message || 'Error al actualizar la tarea');
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
