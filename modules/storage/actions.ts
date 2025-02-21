import { Medication } from "@/types/medication";

type LoadAction = {
  type: "load";
  payload: Medication[];
};

type AddAction = {
  type: "added";
  payload: Medication;
};

type ChangeAction = {
  type: "changed";
  payload: Medication;
};

type DeleteAction = {
  type: "deleted";
  payload: Medication;
};

export type Action = LoadAction | AddAction | ChangeAction | DeleteAction;
