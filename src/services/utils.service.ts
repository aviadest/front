import { FilterData } from "../entities/filter.interface";

export const parseFilterDataToString = (filter: FilterData): string => {
    const params = new URLSearchParams();

    if (filter.from) {
        params.append('from', filter.from.format('YYYY-MM-DD'));
    }
    if (filter.to) {
        params.append('to', filter.to.format('YYYY-MM-DD'));
    }
    if (filter.status) {
        params.append('status', filter.status);
    }
    if (filter.company) {
        params.append('company', filter.company);
    }

    return params.toString();
}