import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './model/employe';
import { EmployeeService } from './employee.service';
import { CommonModule ,NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf , CommonModule , FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Employee';

  page = 0;
  size = 10;
  totalPages : number = 0;
  remoteData : any;
  data: any = undefined;
  onModify : boolean = false;

  newE : Employee = {
    id : undefined,
    firstName : "",
    lastName : "",
    birthDate : "",
    hireDate : "",
    gender : ""
  }

  constructor(private employeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadData(this.page, this.size);
  }




  loadData = (page: number, size: number) => {
    page = this.page;
    size = this.size;
    this.employeService.get(page, size).subscribe(remoteData => {this.data = remoteData ; this.totalPages = remoteData.page.totalPages});

  }

  changePage = (delta: number) => {

    switch (delta) {
      case 0:
        this.page = 0;
        break;

      case +1:
        this.page++;
        break;

      case -1:
        this.page--;
        break;

      case this.totalPages-1:
        this.page = this.totalPages-1;
        break;
    }

    this.loadData(this.page, this.size);
  }

  elimina = (idEmployee : number) => {
    this.employeService.delete(idEmployee).subscribe(
      (remoteData) => {
        //this.data = remoteData
        this.loadData(this.page, this.size);
      }
    );
  }

  aggiungi = () => {
    this.employeService.post(this.newE).subscribe((remoteData) => {this.loadData(15002 , this.size)});
  }

  modifica = (idEmployee : number) => {
    this.onModify = true;
    
    this.employeService.getEmployee(idEmployee).subscribe((remoteData ) => { this.newE = remoteData}); // facendo così i campi si ripopolano subito ,  evitando gli errori dovuti dall'asincronità


   /* this.employeService.put(idEmployee, this.newE).subscribe((remoteData) => {this.loadData(this.page,this.size)});*/
  }

  aggiorna = () => {
  
    this.employeService.put(this.newE.id, this.newE).subscribe((remoteData) => {this.loadData(this.page,this.size)});
    this.onModify = false ;
    this.newE = {
      id : undefined,
      firstName : "",
      lastName : "",
      birthDate : "",
      hireDate : "",
      gender : ""
    };
  }
 
}
