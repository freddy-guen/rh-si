import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EmployeService } from "../service/employe.service";
import { addEmploye, addEmployeSuccess, deleteEmploye, deleteEmployeSuccess, emptyAction, loadEmploye, loadEmployeFail, loadEmployeSuccess, updateEmploye, updateEmployeSuccess } from "./employe.actions";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class EmployeEffect {

  /*constructor(private actions$ : Actions, private employeService : EmployeService) {

  }*/
  actions$ = inject(Actions);
  employeService = inject(EmployeService);
  toastr = inject(ToastrService);

  _loadEmploye = createEffect(
    () => this.actions$.pipe(
      ofType(loadEmploye),
      exhaustMap(
        (action) => {
          return this.employeService.getAllEmployes().pipe(
            map(
              (result) => {
                return loadEmployeSuccess({listeEmployes : result})
              }
            ),
            catchError(
              (error) => of(loadEmployeFail({errorMessage : error.message}))
            )
          )
        }
      )
    )
  );

  _deleteEmploye = createEffect(
    () => this.actions$.pipe(
      ofType(deleteEmploye),
      switchMap(
        (action) => {
          return this.employeService.deleteEmploye(action.id).pipe(
            switchMap(
              (result) => {
                return of(
                  deleteEmployeSuccess({ id : action.id }),
                  this.showAlert('Employé supprimé avec succès', 'pass')
                )
              }
            ),
            catchError(
              (error) => of(this.showAlert(error.message, 'fail'))
            )
          )
        }
      )
    )
  );

  _addEmploye = createEffect(
    () => this.actions$.pipe(
      ofType(addEmploye),
      switchMap(
        (action) => {
          return this.employeService.addEmploye(action.employe).pipe(
            switchMap(
              (result) => {
                return of(
                  addEmployeSuccess({ employe : action.employe }),
                  this.showAlert('Employé créé avec succès', 'pass')
                )
              }
            ),
            catchError(
              (error) => of(this.showAlert(error.message, 'fail'))
            )
          )
        }
      )
    )
  );

  _updateEmploye = createEffect(
    () => this.actions$.pipe(
      ofType(updateEmploye),
      switchMap(
        (action) => {
          return this.employeService.updateEmploye(action.employe).pipe(
            switchMap(
              (result) => {
                return of(
                  updateEmployeSuccess({ employe : action.employe }),
                  this.showAlert('Employé mis à jour avec succès', 'pass')
                )
              }
            ),
            catchError(
              (error) => of(this.showAlert(error.message, 'fail'))
            )
          )
        }
      )
    )
  );


  showAlert(message : string, response : string) {
    if(response == 'pass') {
      this.toastr.success(message);
    }
    else {
      this.toastr.error(message);
    }

    return emptyAction();
  }
}
