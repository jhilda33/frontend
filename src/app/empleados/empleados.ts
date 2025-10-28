import { Component, OnInit } from '@angular/core';
import { EmpleadoService, Empleado } from '../services/empleado.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.html',
  styleUrls: ['./empleados.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  nuevoEmpleado: Empleado = {
    nombre: '',
    apellido: '',
    correo: '',
    salario: 0
  };

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit() {

    
     this.empleados = [
    { id: 999, nombre: 'Test', apellido: 'Prueba', correo: 'test@test.com', salario: 1000 }
  ];


    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (error) => {
        console.error('Error al cargar empleados:', error);
        alert('Error al cargar empleados');
      }
    });
  }

  guardarEmpleado() {
    if (!this.nuevoEmpleado.nombre || !this.nuevoEmpleado.apellido || 
        !this.nuevoEmpleado.correo || !this.nuevoEmpleado.salario) {
      alert('Por favor complete todos los campos');
      return;
    }

    this.empleadoService.createEmpleado(this.nuevoEmpleado).subscribe({
      next: (empleado) => {
        this.cargarEmpleados();
        this.nuevoEmpleado = { nombre: '', apellido: '', correo: '', salario: 0 };
        alert('Empleado registrado exitosamente');
      },
      error: (error) => {
        console.error('Error al guardar empleado:', error);
        alert('Error al guardar empleado');
      }
    });
  }
}