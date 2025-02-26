import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployeDTO } from "./employe.dto";


const getEmployeState = createFeatureSelector<EmployeDTO>('emp');

export const getListeEmployes = createSelector(
  getEmployeState,
  (state) => {
    return state.listeEmployes;
  }
);

export const selectEmploye = createSelector(
  getEmployeState,
  (state) => {
    return state.employe;
  }
);
