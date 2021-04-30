import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        FIT-FEED
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  overlap: {
    height: '100%',
  },
  userID: {
    error: false,
  }
}));

const server = 'http://localhost:4000';

const register = async(id,passwd,nickname) => {
  await axios.get(server + '/api/REGISTER',{
    params:{
      id: id,
      passwd: passwd,
      nickname: nickname
    }
  });
}

const valid_id = async(id) => {
  const res = await axios.get(server + '/api/ID_CHECK',{
    params:{
      id: id,
    }
  });
  return res;
}

const checkID = async(userID) => {
  var ret = false;
  await valid_id(userID).then((res) => {
    if( res.data === 'invalid'){
      ret = false;
    }
    else{
      ret = true;
    }
  });
  return ret;
}

function handleSubmit(event) {
  event.preventDefault();
  if(valid_id(event.target.id.value) === 'invalid'){
    console.log(0);
  }
  else{
    console.log(1);
    register(event.target.id.value,event.target.password.value,event.target.name.value);
  }
}

export default function SignUp() {
  const classes = useStyles();
  var userID = useState("");
  function changeID(e){
    userID = e.target.value;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          FIT-FEED
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="id"
                label="아이디"
                name="id"
                autoComplete="id"
                className={classes.userID}
                onChange={changeID}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.overlap}
                onClick={() => {
                  checkID(userID).then((res)=>{
                    console.log(res)
                  })
                }}
                >
                중복확인
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="이름"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            회원가입
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                로그인 하러가기
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}