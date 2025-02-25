import { Component, OnInit } from '@angular/core';
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
import { MatDialogRef } from '@angular/material/dialog';

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
export class AddEmployeComponent {

  constructor(
    private employeService : EmployeService,
    private ref : MatDialogRef<AddEmployeComponent>) {

  }

  titre = "Ajout d'un nouvel employé";

  employeForm = new FormGroup({
    id : new FormControl(0),
    nom : new FormControl('', Validators.required),
    prenom : new FormControl('', Validators.required),
    dateNaissance : new FormControl(new Date(), Validators.required),
    role : new FormControl('', Validators.required),
    dateEntree : new FormControl(new Date(), Validators.required),
    salaire : new FormControl(0, Validators.required)
  });


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

      this.employeService.addEmploye(employe).subscribe(
        result => {
          alert('Enregistré');
          this.closePopup();
        }
      );

    }
    else {
      console.log("Données non valides !");
    }
  }

  closePopup() {
    this.ref.close();
  }


}
