import { Time } from "@/types/medication";

const now = new Date();

export type FormDataState = {
  name: string;
  startHour: Time;
  interval: Time;
  error: {
    name: string | null;
  };
};

export const initialState: FormDataState = {
  name: "",
  startHour: {
    hour: String(now.getHours()).padStart(2, "0"),
    minutes: String(now.getMinutes()).padStart(2, "0"),
  },
  interval: {
    hour: "00",
    minutes: "00",
  },
  error: {
    name: null,
  },
};
