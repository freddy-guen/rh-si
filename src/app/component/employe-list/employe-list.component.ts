import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddEmployeComponent } from '../add-employe/add-employe.component';
import { Employe } from '../../model/employe';
import { EmployeService } from '../../service/employe.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employe-list',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    CommonModule   //currency, date sont dedans
  ],
  templateUrl: './employe-list.component.html',
  styleUrl: './employe-list.component.css'
})
export class EmployeListComponent implements OnInit, OnDestroy {

  employesList : Employe[] = [];
  dataSource !: MatTableDataSource<Employe>;
  displayedColumns : string[] = ['id', 'nom', 'prenom', 'dateNaissance', 'role', 'dateEntree', 'salaire', 'action'];
  //displayedColumns : string[] = ['id', 'nom', 'prenom', 'dateNaissance', 'role', 'dateEntree', 'salaire'];
  subscription = new Subscription();

  constructor(
    private dialog : MatDialog,
    private serviceEmploye : EmployeService){

  }

  ngOnInit(): void {
    this.getAllEmployes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addEmploye() {
    this.dialog.open(
      AddEmployeComponent,
      {
        width : '50%',
        enterAnimationDuration : '500ms',
        exitAnimationDuration : '500ms'
      }
    ).afterClosed().subscribe( //après la fermeture de la popup on recharge en appelant getAllEmployes
      o => {
        this.getAllEmployes();
      }
    )
  }

  getAllEmployes() {
    let sub = this.serviceEmploye.getAllEmployes().subscribe(
      result => {
        this.employesList = result;
        this.dataSource = new MatTableDataSource(this.employesList);
      }
    );
    this.subscription.add(sub);
  }

}
