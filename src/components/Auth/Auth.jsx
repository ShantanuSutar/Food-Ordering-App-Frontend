import { Box, Modal } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom'
import { addressModalStyle as style } from "../Cart/modalStyle"
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';


const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleOnClose = () => [
        navigate("/")
    ]

  return (
    <div>
        <Modal open={
            location.pathname === "/account/register" || 
            location.pathname === "/account/login"
        }
        onClose={handleOnClose}
        >
            <Box sx={style}>
                {location.pathname === "/account/register" ? <RegisterForm/> : <LoginForm/>}

            </Box>
        </Modal>
    </div>
  )
}

export default Auth
