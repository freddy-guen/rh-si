import { createReducer, on } from "@ngrx/store"
import { employeState } from "./employe.state"
import { addEmployeSuccess, deleteEmployeSuccess, getEmploye, loadEmployeFail, loadEmployeSuccess, updateEmploye, updateEmployeSuccess } from "./employe.actions";

const _employeReducer = createReducer(
  employeState,
  on(
    loadEmployeSuccess,
    (state, action) => {
      return {
        ...state,
        listeEmployes : action.listeEmployes,
        errorMessage : ""
      }
    }
  ),
  on(
    loadEmployeFail,
    (state, action) => {
      return {
        ...state,
        listeEmployes : [],
        errorMessage : action.errorMessage
      }
    }
  ),
  on(
    deleteEmployeSuccess,
    (state, action) => {
      const _updatedList = state.listeEmployes.filter(o=>o.id!=action.id)
      return {
        ...state,
        listeEmployes : _updatedList,
        errorMessage : ""
      }
    }
  ),
  on(
    addEmployeSuccess,
    (state, action) => {
      const _newEmploye = {...action.employe}
      return {
        ...state,
        listeEmployes : [...state.listeEmployes, _newEmploye],
        errorMessage : ""
      }
    }
  ),
  on(
    updateEmployeSuccess,
    (state, action) => {
      const _updatedEmployeList = state.listeEmployes.map(
        o => {
          return o.id === action.employe.id ? action.employe : o;
        }
      )
      return {
        ...state,
        listeEmployes : _updatedEmployeList,
        errorMessage : ""
      }
    }
  ),
  on(
    getEmploye,
    (state, action) => {
      let _employe = state.listeEmployes.find(o => o.id == action.id);
      if(_employe == null) {
        _employe = state.employe;
      }
      return {
        ...state,
        employe : _employe
      }
    }
  )

);

export function employeReducer(state : any, action : any) {
  return _employeReducer(state, action);
}

