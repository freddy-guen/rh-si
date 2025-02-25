import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Employe } from '../../model/employe';
import { EmployeService } from '../../service/employe.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employe',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './add-employe.component.html',
  styleUrl: './add-employe.component.css'
})
export class AddEmployeComponent implements OnInit{

  titre = "Ajout d'un nouvel employé";

  dialogData : any;

  isEdit = false;

  employeForm = new FormGroup({
    id : new FormControl(0),
    nom : new FormControl('', Validators.required),
    prenom : new FormControl('', Validators.required),
    dateNaissance : new FormControl(new Date(), Validators.required),
    role : new FormControl('', Validators.required),
    dateEntree : new FormControl(new Date(), Validators.required),
    salaire : new FormControl(0, Validators.required)
  });

  constructor(
    private employeService : EmployeService,
    private ref : MatDialogRef<AddEmployeComponent>,
    private toast : ToastrService,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) {

  }

  ngOnInit(): void {
    this.dialogData = this.data;
    if(this.dialogData.code > 0) {
      this.titre = "Modification d'un employé";
      this.isEdit = true;
      this.employeService.getEmployeById(this.dialogData.code).subscribe(
        result => {
          let _data = result;
          if(_data != null) {
            this.employeForm.setValue({
              id: _data.id,
              nom: _data.nom,
              prenom: _data.prenom,
              dateNaissance: _data.dateNaissance,
              role: _data.role,
              dateEntree: _data.dateEntree,
              salaire: _data.salaire
            })
          }
        }
      )
    }
  }

  saveEmploye() {
    if(this.employeForm.valid) {
      let employe : Employe = {
        id : this.employeForm.value.id as number,
        nom : this.employeForm.value.nom as string,
        prenom : this.employeForm.value.prenom as string,
        dateNaissance : new Date(this.employeForm.value.dateNaissance as Date),
        role : this.employeForm.value.role as string,
        dateEntree : new Date(this.employeForm.value.dateEntree as Date),
        salaire: this.employeForm.value.salaire as number,
      };

      if(this.isEdit) {
        this.employeService.updateEmploye(employe).subscribe(
          result => {
            this.toast.success("Mise à jour avec succès", "Mise à jour");
            this.closePopup();
          }
        );
      }
      else {
        this.employeService.addEmploye(employe).subscribe(
          result => {
            this.toast.success("Création avec succès", "Création");
            this.closePopup();
          }
        );
      }

    }
    else {
      console.log("Données non valides !");
    }
  }

  closePopup() {
    this.ref.close();
  }


}
