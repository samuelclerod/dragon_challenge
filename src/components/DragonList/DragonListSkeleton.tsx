import { Avatar, createStyles, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Theme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";


export function DragonListSkeleton() {
  const classes = useStyles();
  return (
    <div>
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
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },

  }),
);