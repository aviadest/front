import { useState } from 'react';
import MonthlyInvoiceTotalsChart from '../../components/charts/monthly-invoice-totals';
import OverdueInvoicesTrendChart from '../../components/charts/overdue-invoices-trend';
import TotalsByStatusChart from '../../components/charts/totals-by-status';
import Filter from '../../components/filter/filter';
import { FilterData } from '../../entities/filter.interface';
import { parseFilterDataToString } from '../../services/utils.service';
import './dashboard.scss';
import CustomerAnalysisChart from '../../components/charts/customer-analysis-chart';



function DashBoard() {

    const [filterString, setFilterString] = useState<string>()

    const onSubmit = async (filterData: FilterData) => {
        console.dir(filterData);
        const parsed = parseFilterDataToString(filterData);
        setFilterString(parsed);
    };


    return (
        <div className={'dashboard-container'}>

            <Filter onSubmit={onSubmit} />
            <div className={'charts'}>
                <TotalsByStatusChart filterString={filterString} />
                <OverdueInvoicesTrendChart filterString={filterString} />
                <MonthlyInvoiceTotalsChart filterString={filterString} />
                <CustomerAnalysisChart filterString={filterString} />
            </div>
        </div>
    )
}

export default DashBoard;