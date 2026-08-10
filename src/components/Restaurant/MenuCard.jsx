import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MenuCard = () => {
  return (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            >
            <div className=' lg:flex items-center justify-between'>
              <div className=' lg:flex items-center lg:gap-5'>
                <img className='  w-[7rem] h-[7rem] object-cover' src="https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg" alt="" />
                <div className=' space-y-1 lg:space-y-5 lg:max-w-2xl'>
                  <p className=' font-semibold text-xl'>bBrger</p>
                  <p>₹499</p>
                  <p className=' text-gray-400'>Nice Food</p>
                </div>
              </div>
            </div>
        </AccordionSummary>
        <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
    </Accordion>
  )
}

export default MenuCard