export type Time = {
  hour: string;
  minutes: string;
};

export interface Medication {
  id: string;
  name: string;
  startHour: Time;
  interval: Time;
}
