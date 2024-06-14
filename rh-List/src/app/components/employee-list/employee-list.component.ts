import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Empregado } from '../../models/empregado.model';
import { EmpregadoService } from '../../service/empregado.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    NgbModule,
    NgxPaginationModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
  providers: [EmpregadoService],
})
export class EmployeeListComponent implements OnInit {
  employees: Empregado[] = [];
  filteredEmployees: Empregado[] = [];
  newEmpregado: Empregado = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    cpf: '',
    address: '',
    dateOfBirth: '',
    currentlyEmployed: true,
  };
  selectedEmpregado: Empregado = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    cpf: '',
    address: '',
    dateOfBirth: '',
    currentlyEmployed: true,
  };
  isEditModalOpen = false;
  searchTerm: string = '';
  currentPage: number = 1;

  constructor(
    private empregadoService: EmpregadoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.empregadoService.getEmpregados().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.filteredEmployees = employees;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
        this.showErrorMessage('Error fetching employees');
      },
      complete: () => {
        console.log('Employee fetching completed');
      },
    });
  }

  deleteEmpregado(id: string): void {
    this.empregadoService.deleteEmpregado(id).subscribe({
      next: () => {
        console.log('Employee deleted successfully');
        this.employees = this.employees.filter((emp) => emp.id !== id);
        this.getEmployees();
        this.showSuccessMessage('Employee deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
        this.showErrorMessage('Error deleting employee');
      },
      complete: () => {
        console.log('Employee deletion completed');
      },
    });
  }

  openEditModal(employee: Empregado): void {
    this.selectedEmpregado = { ...employee };
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  createEmpregado(): void {
    if (this.newEmpregado.dateOfBirth) {
      const date = new Date(this.newEmpregado.dateOfBirth);
      const formattedDate = date.toJSON();
      this.newEmpregado.dateOfBirth = formattedDate;
    }
    this.empregadoService.addEmpregado(this.newEmpregado).subscribe({
      next: (employee) => {
        console.log('Employee created successfully:', employee);
        this.getEmployees();
        this.showSuccessMessage('Employee created successfully');
      },
      error: (error) => {
        console.error('Error creating employee:', error);
        if (error.status === 409) {
          this.showErrorMessage('User with this name already exists');
        } else {
          this.showErrorMessage('Error creating employee');
        }
      },
      complete: () => {
        console.log('Employee creation completed');
      },
    });
  }

  updateEmpregado(): void {
    this.empregadoService
      .updateEmpregado(this.selectedEmpregado.id, this.selectedEmpregado)
      .subscribe({
        next: (employee) => {
          console.log('Employee updated successfully:', employee);
          this.getEmployees();
          this.closeEditModal();
          this.showSuccessMessage('Employee updated successfully');
        },
        error: (error) => {
          console.error('Error updating employee:', error);
          this.showErrorMessage('Error updating employee');
        },
        complete: () => {
          console.log('Employee update completed');
        },
      });
  }

  filterEmployees(): void {
    this.filteredEmployees = this.employees.filter(
      (employee) =>
        employee.firstName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        employee.lastName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        employee.cpf.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        employee.address.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success'],
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-error'],
    });
  }
}
