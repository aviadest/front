import { Button, FormControl, MenuItem, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { FilterData } from '../../entities/filter.interface';
import './filter.scss';



interface FilterProps {
    onSubmit: (filterData: FilterData) => void;
}

function Filter(props: FilterProps) {
    const { onSubmit } = props;

    useEffect(() => {

        formik.resetForm();
    }, []);

    dayjs.locale('he');
    const formik = useFormik<FilterData>({
        initialValues: {
            from: null,
            to: null,
            status: 'all',
            company: '',
        },
        onSubmit: (values) => {
            onSubmit(values);
            console.log(values);
        },
        onReset: () => {
            onSubmit(formik.initialValues);
        },

    });

    const handleFromDateTimeChange = (newValue: Dayjs | null) => {
        const { to } = formik.values;
        if (to && newValue && to.isBefore(newValue)) {
            formik.setFieldValue('to', newValue.add(1, 'day'));
        }
    };

    const handleToDateTimeChange = (newValue: Dayjs | null) => {
        const { from } = formik.values;
        if (from && newValue && from.isAfter(newValue)) {
            formik.setFieldValue('from', newValue.add(-1, 'day'));
        }
    };

    const datePickerProps = {
        closeOnSelect: true,
        format: 'DD/MM/YYYY',
    };



    return (
        <div className='filter-container' >
            <form>
                <h1>Filter</h1>

                <TextField
                    label="Invoice Status"
                    select
                    fullWidth
                    margin="normal"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="overdue">Overdue</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                </TextField>

                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <FormControl margin='normal' fullWidth>

                        <DatePicker
                            {...datePickerProps}

                            name={'from'}
                            label={'From:'}
                            value={formik.values.from}
                            onChange={(value) => {
                                formik.setFieldValue('from', value);
                                handleFromDateTimeChange(value)
                            }}
                            minDate={undefined}
                            maxDate={formik.values.to ? formik.values.to.add(-1, 'day') : undefined}

                        />
                    </FormControl>
                    <FormControl margin='normal' fullWidth>
                        <DatePicker
                            {...datePickerProps}
                            name={'to'}
                            label={'To:'}
                            value={formik.values.to}
                            onChange={(value) => {
                                formik.setFieldValue('to', value);
                                handleToDateTimeChange(value)
                            }}
                            minDate={formik.values.from?.add(1, 'day') || undefined}
                        />
                    </FormControl>
                </LocalizationProvider>
                <TextField
                    label="Company"
                    type="text"
                    fullWidth
                    margin="normal"
                    name="company"
                    value={formik.values.company}
                    onChange={formik.handleChange}
                />

                <div className={'buttons'}>
                    <Button variant="contained" onClick={(e) => formik.handleReset(e)}>
                        Clear
                    </Button>
                    <Button variant="contained" onClick={() => formik.handleSubmit()}>
                        Filter
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Filter;