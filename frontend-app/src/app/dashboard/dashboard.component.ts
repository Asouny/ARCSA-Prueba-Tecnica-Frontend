import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTaskComponent } from './dialog-add-task/dialog-add-task.component';
import { DialogEditTaskComponent } from './dialog-edit-task/dialog-edit-task.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  tareas: any[] = [];
  tareasFiltradas: any[] = [];
  filtroEstatus: string = '';
  displayedColumns: string[] = [
    'id',
    'titulo',
    'descripcion',
    'estatus',
    'acciones',
  ];

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.obtenerTareas();
  }

  obtenerTareas() {
    this.dashboardService.getTareas().subscribe({
      next: (res: any) => {
        this.tareas = res;
        this.aplicarFiltro();
      },
      error: (err: any) => {
        console.error(err);
        alert('Error al obtener las tareas');
      },
    });
  }

  editarTarea(tarea: any) {
    const dialogRef = this.dialog.open(DialogEditTaskComponent, {
      width: '400px',
      data: tarea,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerTareas();
      }
    });
  }

  eliminarTarea(id: number) {
    if (confirm('¿Seguro que deseas eliminar esta tarea?')) {
      this.dashboardService.deleteTarea(id).subscribe({
        next: () => {
          alert('Tarea eliminada');
          this.obtenerTareas();
        },
        error: (err: any) => {
          console.error(err);
          alert('Error al eliminar tarea');
        },
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  abrirDialogNuevaTarea() {
    const dialogRef = this.dialog.open(DialogAddTaskComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerTareas();
      }
    });
  }

  aplicarFiltro() {
    if (this.filtroEstatus) {
      this.tareasFiltradas = this.tareas.filter(
        (t) => t.estatus === this.filtroEstatus
      );
    } else {
      this.tareasFiltradas = this.tareas;
    }
  }
}
