import { createAction, props } from "@ngrx/store";
import { Employe } from "../model/employe";

export const LOAD_EMPLOYE = '[Employe] Get All Employe';
export const LOAD_EMPLOYE_SUCCESS = '[Employe] Get All Employe Success';
export const LOAD_EMPLOYE_FAIL = '[Employe] Get All Employe Fail';

export const DELETE_EMPLOYE = '[Employe] Delete employe';
export const DELETE_EMPLOYE_SUCCESS = '[Employe] Delete Employe Success';

export const ADD_EMPLOYE = '[Employe] Add employe';
export const ADD_EMPLOYE_SUCCESS = '[Employe] Add Employe Success';

export const UPDATE_EMPLOYE = '[Employe] Update employe';
export const UPDATE_EMPLOYE_SUCCESS = '[Employe] Update Employe Success';

export const GET_EMPLOYE = '[Employe] Get employe';

// Récupération de la liste des employés
export const loadEmploye = createAction(LOAD_EMPLOYE);
export const loadEmployeSuccess = createAction(LOAD_EMPLOYE_SUCCESS, props<{ listeEmployes : Employe[] }>());
export const loadEmployeFail = createAction(LOAD_EMPLOYE_FAIL, props<{ errorMessage : string }>());

// Suppression employé
export const deleteEmploye = createAction(DELETE_EMPLOYE, props<{ id : number }>());
export const deleteEmployeSuccess = createAction(DELETE_EMPLOYE_SUCCESS, props<{ id : number }>());

// Ajout employé
export const addEmploye = createAction(ADD_EMPLOYE, props<{ employe : Employe }>());
export const addEmployeSuccess = createAction(ADD_EMPLOYE_SUCCESS, props<{ employe : Employe }>());

// Mise à jour employé
export const updateEmploye = createAction(UPDATE_EMPLOYE, props<{ employe : Employe }>());
export const updateEmployeSuccess = createAction(UPDATE_EMPLOYE_SUCCESS, props<{ employe : Employe }>());

// Récupération d'un employé
export const getEmploye = createAction(GET_EMPLOYE, props<{ id : number }>());

// Action vide
export const emptyAction = createAction('empty');
