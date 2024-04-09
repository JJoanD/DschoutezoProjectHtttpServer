import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './model/employe';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient : HttpClient) { 

  }

  get(page: number, size : number) : Observable<any> {
    return this.httpClient.get(`http://localhost:8080/employees?page=${page}&size=${size}&sort=id`);
  }

  delete(id : number) : Observable<any> {
      return this.httpClient.delete(`http://localhost:8080/employees/${id}`,{});
  }

  post(newEmployee : Employee) : Observable<any>{

    return this.httpClient.post(`http://localhost:8080/employees` , newEmployee);
  }

  getEmployee(id : number) : Observable<any>{
    return this.httpClient.get(`http://localhost:8080/employees/${id}` , {});
  }
  put(id : any , updateEmployee : any) : Observable<any>{
    const body = {}
    return this.httpClient.put(`http://localhost:8080/employees/${id}`,updateEmployee);
  }
}
