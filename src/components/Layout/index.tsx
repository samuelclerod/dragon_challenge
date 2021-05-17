import { AppBar, Breadcrumbs, Button, Container, createStyles, Link, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { ReactNode } from "react";
import { GiSpikedDragonHead } from "react-icons/gi";
import { useHistory } from "react-router";
import { useAuth } from "../../hooks/useAuth";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface LayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}
export function Layout({ children, breadcrumbs }: LayoutProps) {
  const router = useHistory()
  const classes = useStyles();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <GiSpikedDragonHead size='1.5rem' className={classes.logo} />
          <Typography variant="h6" className={classes.title}>
            Dragon
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={classes.breadcrumbContainer} >
        <>
          {breadcrumbs && (
            <Breadcrumbs aria-label="breadcrumb">
              {breadcrumbs?.map((item: BreadcrumbItem, index: number) => item.href
                ? (
                  <Link key={index} color="inherit" href={item.href} >{item.name}</Link>
                ) : (
                  <Typography key={index} color="textPrimary">{item.name}</Typography>
                )
              )}
            </Breadcrumbs>
          )}
        </>
      </Container>
      <Container maxWidth="md" className={classes.content} >
        <>
          {children}
        </>
      </Container>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: grey[100],
      minHeight: '100vh',
    },
    logo: {
      marginRight: theme.spacing(2),
    },
    content: {
      paddingTop: theme.spacing(2),
    },
    breadcrumbContainer: {
      paddingTop: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);
