import { Employe } from "../model/employe";

export interface EmployeDTO {
  employe : Employe;
  listeEmployes : Employe[];
  errorMessage : string;
}
