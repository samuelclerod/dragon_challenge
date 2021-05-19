import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { GiSpikedDragonHead } from "react-icons/gi";
import { Dragon } from "./DragonInteface";

interface DragonListItemProps {
  dragon: Dragon;
  editDragon: () => void;
  deleteDragon: () => void;
  showDragon: () => void;
}

export function DragonListItem({ dragon, editDragon, deleteDragon, showDragon, }: DragonListItemProps) {
  return (
    <ListItem button onClick={showDragon}>
      <ListItemAvatar>
        <Avatar>
          <GiSpikedDragonHead />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={dragon.name} secondary={dragon.type} />
      <ListItemSecondaryAction>
        <IconButton edge="end"
          aria-label="edit"
          onClick={editDragon}>
          < Edit color="primary" />
        </IconButton>
        <IconButton edge="end" aria-label="remove"
          onClick={deleteDragon}
        >
          <Delete color="secondary" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
