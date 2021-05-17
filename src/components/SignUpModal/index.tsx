import { Avatar, Backdrop, Button, createStyles, Fade, Grid, IconButton, makeStyles, Modal, TextField, Theme, Typography } from "@material-ui/core";
import { AccountCircle, Close } from "@material-ui/icons";
import { SyntheticEvent } from "react";
import { useToast } from "../../hooks/useToast";
import { signUp } from '../../services/fakeAuthService'

interface SingUpModalProps {
  show: boolean;
  handleClose: () => void;
}
interface SignUpFormInput {
  value: string;
}

interface SignUpFormFields {
  name: SignUpFormInput;
  username: SignUpFormInput;
  password: SignUpFormInput;
  password_confirmation: SignUpFormInput;
}


export function SignUpModal({ show, handleClose }: SingUpModalProps) {
  const classes = useStyles();
  const { addToast } = useToast()

  const handleSignUp = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & SignUpFormFields
    const values = {
      name: target.name.value.trim(),
      username: target.username.value.trim(),
      password: target.password.value.trim(),
    }
    try {
      if (values.password !== target.password_confirmation.value) {
        throw new Error("Senhas não combinam");
      }
      if (values.name === '' || values.username === '' || values.password === '') {
        throw new Error("Todos os campos devem ser preenchidos");
      }
      await signUp(values);
      addToast({ message: 'Usuário cadastrado com sucesso', type: 'success' })
      handleClose();
    } catch (error) {
      addToast({ message: error.message, type: 'error' })
    }
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={show}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={show}>
        <div className={classes.paper}>
          <Grid container justify="flex-end">
            <IconButton size="small" onClick={handleClose}><Close /></IconButton>
          </Grid>
          <Avatar className={classes.avatar}>
            <AccountCircle />
          </Avatar>
          <Typography component="h1" variant="h5">
            Novo Usuário
        </Typography>
          <form className={classes.form} noValidate onSubmit={handleSignUp}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Seu nome"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password_confirmation"
              label="Confirmar Senha"
              type="password"
              id="password_confirmation"
              autoComplete="password_confirmation"
            />
            <Grid container>
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Criar usuário
              </Button>
            </Grid>

          </form>
        </div>
      </Fade>
    </Modal>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
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
  }),
);