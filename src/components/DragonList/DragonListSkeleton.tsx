import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

interface DragonListSkeletonProps {
  className: string;
}

export function DragonListSkeleton({ className }: DragonListSkeletonProps) {
  return (
    <List className={className}>
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
}
