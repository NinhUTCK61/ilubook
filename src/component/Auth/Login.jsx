import styled from '@emotion/styled';
import { Container, Grid, Link, Stack, Typography } from '@mui/material';
import { Checkbox } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const ImgCardLogin = styled('div')(({theme}) => ({
    backgroundImage: 'url(assets/img/img-card-login.jpg)',
    backgroundPosition: 'top center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '45%',
    borderTopLeftRadius :'15px',
    borderBottomLeftRadius: '15px',
}));

const CardBody = styled('div')(({theme}) =>({
    height : '100%',
    display :'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width : '55%',
    marginTop: '3%'
}));

const InputLogin = styled('div')(({theme}) =>({
    position: 'relative',
    borderRadius: '10px',
    width: '90%',
}));

const Remember = styled('div')(({theme}) =>({
    position: 'relative',
    width: '85%',
}));

export default function Login() {
    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleLogin = () => {
        axios.post('http://localhost:8000/api/login', {email:email, password:password})
            .then(res=>{
                let user = res['data']['user']
                let token = res['data']['token']
                if(token != false){
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))
                    navigate('/', {state:{data: token}})
                } else {
                    alert('dang nhap that bai')
                }
            })
    }
    return(
        <div className='login'>
            <Container>
                <Stack
                    direction={{xs:'row', sm:'row', md:'row'}}
                    sx={{display:{border: 'solid 1px', borderRadius: '15px',}}}
                >
                    <ImgCardLogin
                        sx={{display: { xs:'none', sm:'none', md:'flex', }}}
                    >
                    </ImgCardLogin>
                    <CardBody>
                        <div className="title-login" style={{fontSize:'24px', fontWeight:'600'}}>Login to your account</div>
                        
                        <TextField
                            id="outlined-password-input"
                            label="Email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder='Email Address'
                            type="text"
                            
                            sx={{display: { marginTop: '3%', width: '85%'}}}
                        />

                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            value={password}
                            onChange={(e) =>setPassword(e.target.value)}
                            placeholder='PassWord'
                            type="password"
                            autoComplete="current-password"
                            sx={{display: { marginTop: '3%', width: '85%'}}}
                        />
                        <Remember>
                            <FormControlLabel
                                control={<Checkbox Checked />}
                                label="Remember me"
                                sx={{position:'absolute', left:'0'}}
                            />
                        </Remember>
                        <Button
                            variant="contained"
                            sx={{background:'#f51167', width: '85%', marginTop: '10%'}}
                            type="button"
                            onClick={handleLogin}
                        >
                            Login
                        </Button>

                        <Typography
                            sx={{display : { position:'relative', width:'85%', marginTop: '2%'}}}
                        >
                            <Link to='#'
                                sx={{display : {position:'absolute', right: '0' }}}
                            >
                                For got password
                            </Link>
                        </Typography>

                        <Typography
                            sx={{marginTop:'5%'}}
                        >
                            or login with
                        </Typography>

                        <Stack
                            direction = "row"
                            sx = {{width:'85%', marginBottom: '7%'}}
                        >
                            <Button
                                variant="contained"
                                sx={{ marginTop: '10%', width:'50%', marginRight:'5%'}}
                            >
                                Facebook
                            </Button>

                            <Button
                                variant="contained"
                                sx={{background:'#da3f34', marginTop: '10%', width: '50%'}}
                            >
                                Google
                            </Button>
                        </Stack>
                    </CardBody>
                </Stack>
            </Container>
        </div>
    );
}
