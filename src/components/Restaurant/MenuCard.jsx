import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { categorizeIngredients } from '../util/categorizeIngredients';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../State/Cart/Action';

const MenuCard = ({ item }) => {

  const [selectedIngredients, setSelectedIngredients] = useState([])
  const dispatch = useDispatch();

  const handleCheckBoxChange = (itemName) => {
    if(selectedIngredients.includes(itemName)){
      setSelectedIngredients(selectedIngredients.filter((item) => item !== itemName))
    }else{
      setSelectedIngredients([...selectedIngredients, itemName])
    }
    
  }

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    const reqData = {
      token: localStorage.getItem("jwt"),
      cartItem:{  
        foodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients
      }
    }

    dispatch(addItemToCart(reqData))
  }

  return (
    <Accordion className='!rounded-xl'>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            >
            <div className='w-full min-w-0'>
              <div className='flex min-w-0 items-center gap-4 sm:gap-5'>
                <img className='h-24 w-24 shrink-0 rounded-lg object-cover sm:h-28 sm:w-28' src={item.images?.[0]} alt={item.name} />
                <div className='min-w-0 flex-1 space-y-1.5'>
                  <div className='flex flex-wrap items-center gap-2'><p className='text-lg font-bold sm:text-xl'>{item.name}</p>{!item.available && <span className='rounded-full bg-red-500/10 px-2 py-1 text-xs font-semibold text-red-400'>Out of stock</span>}</div>
                  <p className='font-bold text-orange-400'>₹{item.price}</p>
                  <p className='line-clamp-2 text-sm text-slate-400'>{item.description}</p>
                </div>
              </div>
            </div>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleAddItemToCart}>
            <div className='flex flex-wrap gap-6 border-t border-slate-400/15 pt-4'>
              {
                Object.keys(categorizeIngredients(item.ingredients)).map((category) => <div key={category}>
                  <p className='mb-2 font-semibold'>{category}</p>
                  <FormGroup>
                    {categorizeIngredients(item.ingredients)[category].map((item) => <FormControlLabel key={item.id} control={<Checkbox onChange={() => handleCheckBoxChange(item.name)} />} label={item.name} />)}
                  </FormGroup>
                </div> )
              }
            </div>
            <div className=' pt-5'>
              <Button variant='contained' disabled={!item.available} type='submit'>
                {item.available ? "Add to Cart" : "Out of stock"}
              </Button>
            </div>
          </form>
        </AccordionDetails>
    </Accordion>
  )
}

export default MenuCard
