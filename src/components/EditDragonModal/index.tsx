import { Avatar, Backdrop, Button, createStyles, Fade, Grid, IconButton, makeStyles, Modal, TextField, Theme, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { SyntheticEvent } from "react";
import { GiSpikedDragonHead } from "react-icons/gi";
import { useToast } from "../../hooks/useToast";
import { fetcher } from "../../services/fetcher";

interface Dragon {
  id: string;
  name: string;
  type: string;
  histories: string;
}

interface EditDragonModalProps {
  show: boolean;
  handleClose: () => void;
  dragon: Dragon;
}
interface EditDragonFormInput {
  value: string;
}

interface EditDragonFormFields {
  name: EditDragonFormInput;
  type: EditDragonFormInput;
  histories: EditDragonFormInput;
}


export function EditDragonModal({ show, handleClose, dragon }: EditDragonModalProps) {
  const classes = useStyles();
  const { addToast } = useToast()

  const handleEditDragon = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & EditDragonFormFields
    const values = {
      name: target.name.value.trim(),
      type: target.type.value.trim(),
      histories: target.histories.value.trim(),
    }
    try {
      if (values.name === '' || values.type === '' || values.histories === '') {
        throw new Error("Todos os campos devem ser preenchidos");
      }
      await fetcher.put(`dragon/${dragon.id}`, values)
      addToast({ message: 'Dragão atualizado com sucesso', type: 'success' })
      handleClose();
    } catch (error) {
      addToast({ message: "Não foi possível atualizar o dragão", type: 'error' })
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
            <GiSpikedDragonHead />
          </Avatar>
          <Typography component="h1" variant="h5">
            Editar Dragão
        </Typography>
          <form className={classes.form} noValidate onSubmit={handleEditDragon}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              name="name"
              defaultValue={dragon.name}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="type"
              name="type"
              defaultValue={dragon.type}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="histories"
              name="histories"
              defaultValue={dragon.histories}
              autoFocus
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
                Atualizar
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