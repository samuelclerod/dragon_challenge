import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import { useHistory } from 'react-router';
import { Divider } from '@material-ui/core';
import { Fragment, useState } from 'react';
import { EditDragonModal } from '../EditDragonModal';
import { useFetch } from '../../hooks/useFetch';
import { useConfirm } from 'material-ui-confirm';
import { fetcher } from '../../services/fetcher';
import { Dragon } from './DragonInteface'
import { DragonListItem } from './DragonListItem';
import { DragonListSkeleton } from './DragonListSkeleton'

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

  if (!data) return <DragonListSkeleton className={classes.root} />

  return (<>
    <List className={classes.root}>
      {data?.sort((a, b) => a.name.localeCompare(b.name)).map((dragon, index) =>
      (<Fragment key={dragon.id}>
        {index ? <Divider variant="inset" component="li" /> : null}
        <DragonListItem
          dragon={dragon}
          showDragon={() => toDragonDetails(dragon.id)}
          editDragon={() => handleEditDragon(dragon)}
          deleteDragon={() => handleDeleteDragon(dragon)}
        />
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