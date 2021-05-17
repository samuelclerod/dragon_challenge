import { Avatar, Button, Grid, TextField, Typography, Link, makeStyles, Container } from "@material-ui/core"
import { LockOutlined } from "@material-ui/icons"
import { SyntheticEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { SignUpModal } from "../../components/SignUpModal";
import { useToast } from "../../hooks/useToast";

interface LoginFormInput {
  value: string;
}

interface LoginFormFields {
  username: LoginFormInput;
  password: LoginFormInput;
}


export const Login = () => {
  const classes = useStyles();
  const { signIn } = useAuth();
  const { addToast } = useToast()
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSingUpModal = () => {
    setShowSignUp(!showSignUp)
  }

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & LoginFormFields
    const values = {
      username: target.username.value,
      password: target.password.value,
    }
    try {
      await signIn(values);
    } catch (error) {
      addToast({ message: error.message, type: 'error' })
    }
  }

  return (
    <Container maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Grid container justify="flex-end">
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
          </Button>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={handleSingUpModal} className={classes.signUp}>
                "Não tem uma conta? crie a sua"
              </Link>
            </Grid>
          </Grid>
        </form>
        <SignUpModal show={showSignUp} handleClose={handleSingUpModal} />
      </div>
    </Container>
  )
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signUp: {
    cursor: 'pointer',
    textDecoration: '',
  }
}));