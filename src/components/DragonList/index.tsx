import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { GiSpikedDragonHead } from 'react-icons/gi'
import { Skeleton } from '@material-ui/lab';
import { useHistory } from 'react-router';
import { Divider, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { Fragment, useState } from 'react';
import { EditDragonModal } from '../EditDragonModal';
import { useFetch } from '../../hooks/useFetch';
import { useConfirm } from 'material-ui-confirm';
import { fetcher } from '../../services/fetcher';

interface Dragon {
  id: string;
  name: string;
  type: string;
  histories: string;
}

export function DragonList() {


  const { data, mutate } = useFetch<Dragon[], Error>('/dragon');

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDragon, setSelectedDragon] = useState<Dragon>({} as Dragon);

  const classes = useStyles();
  const router = useHistory();
  const confirm = useConfirm();

  const toDragonDetails = (id: string) => {
    router.push(`/dragons/${id}`);
  }

  const handleEditDragon = (dragon: Dragon) => {
    setSelectedDragon(dragon);
    setShowEditModal(true);
  }

  const handleCloseEditDragonModal = async () => {
    setShowEditModal(!showEditModal);
    console.log("handleCloseEditDragonModal");
    mutate();
  }

  const handleDeleteDragon = async (dragon: Dragon) => {
    confirm({ description: `Tem certeza que vai remover ${dragon.name}?` })
      .then(async () => {
        await fetcher.delete(`dragon/${dragon.id}`);
        mutate();
      })
      .catch(() => { console.log("salvou") });
  }

  if (!data) return (
    <List className={classes.root}>
      {[1, 2, 3].map(n => (
        <ListItem key={n}>
          <ListItemAvatar>
            <Skeleton variant="circle">
              <Avatar />
            </Skeleton>
          </ListItemAvatar>
          <ListItemText primary={<Skeleton width="50%"></Skeleton>} secondary={<Skeleton width="80%"></Skeleton>} />
        </ListItem>
      ))}
    </List>
  )
  return (<>
    <List className={classes.root}>
      {data?.sort((a, b) => a.name.localeCompare(b.name)).map((dragon, index) =>
      (<Fragment key={dragon.id}>
        {index ? <Divider variant="inset" component="li" /> : null}
        <ListItem button onClick={e => toDragonDetails(dragon.id)}>
          <ListItemAvatar>
            <Avatar>
              <GiSpikedDragonHead />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={dragon.name} secondary={dragon.type} />
          <ListItemSecondaryAction>
            <IconButton edge="end"
              aria-label="edit"
              onClick={() => handleEditDragon(dragon)}>
              < Edit color="primary" />
            </IconButton>
            <IconButton edge="end" aria-label="remove"
              onClick={() => handleDeleteDragon(dragon)}
            >
              <Delete color="secondary" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Fragment>)
      )}
    </List>
    <EditDragonModal
      show={showEditModal}
      handleClose={handleCloseEditDragonModal}
      dragon={selectedDragon}
    />
  </>);
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },

  }),
);