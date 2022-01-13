import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

export default function SubcategoryDetails(props) {
    const { expenses } = props;
    return (

        expenses.map(expense => (
            <Accordion>
                <AccordionSummary
                    id="panel1a-header"
                >
                    <Typography>{expense.category.category} {expense.subcategory.subcategory} {expense.value}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        ))
    )
}
