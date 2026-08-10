import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const demo = [
  {
    category: "Nuts and Seeds",
    ingredients: ["Cashews"]
  },
  {
    category: "Protein",
    ingredients: ["Ground Beef", "Bacon Strips"]
  }
]



const MenuCard = () => {

  const handleCheckBoxChange = () => {
    console.log("value")
  }
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
          <form action="">
            <div className=' flex gap-5 flex-wrap '>
              {
                demo.map((item) => <div>
                  <p>{item.category}</p>
                  <FormGroup>
                    {item.ingredients.map((item, i) => <FormControlLabel control={<Checkbox onChange={() => handleCheckBoxChange(item)} />} label={item} />)}
                  </FormGroup>
                </div> )
              }
            </div>
            <div className=' pt-5'>
              <Button variant='contained' disabled={false} type='submit'>
                {true ? "Add to Cart" : "Out of stock"}
              </Button>
            </div>
          </form>
        </AccordionDetails>
    </Accordion>
  )
}

export default MenuCard