import { EmployeDTO } from "./employe.dto";


export const employeState : EmployeDTO = {
  employe: {
    id: 0,
    nom: "",
    prenom: "",
    dateNaissance: new Date(),
    role: "",
    dateEntree: new Date(),
    salaire: 0
  },
  listeEmployes: [],
  errorMessage: "",
};
