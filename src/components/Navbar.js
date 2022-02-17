
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import userContext from '../Contexts/userContext'
import { Link } from 'react-router-dom';


const Navbar = () => {
    const { user, logout } = React.useContext(userContext)
    const token = user?.accessToken

    return (
        <AppBar position="static">
            <Container maxWidth="xl">

                <div style={{ 'display': 'flex', 'justifyContent': 'space-between', 'alignItems': 'center', 'height': 50 }}>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        Classroom
                    </Typography>

                    <div style={{ 'width': 150 }}>

                        {
                            token ?
                                <div style={{ 'display': 'flex', 'justifyContent': 'space-around' }}>
                                    <Typography>Join Class</Typography>
                                    <Typography onClick={() => logout()}>Logout</Typography>
                                </div>
                                :
                                <div style={{ 'display': 'flex', 'justifyContent': 'space-around' }}>
                                    <Link to='/signup'> <Typography>Sign Up</Typography></Link>
                                    <Link to='/login'><Typography>Login</Typography></Link>
                                </div>

                        }

                    </div>
                </div>

            </Container>
        </AppBar>
    );
};


export default Navbar
