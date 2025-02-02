import { Dayjs } from "dayjs";

export interface FilterData {
    from: Dayjs | null;
    to: Dayjs | null;
    status: string;
    company: string;
}