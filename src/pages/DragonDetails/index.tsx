import { Button, Card, CardActions, CardContent, makeStyles, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useHistory, useParams } from "react-router"
import { Layout } from "../../components/Layout"
import { useFetch } from "../../hooks/useFetch";
import { formatDate } from "../../utils/FormatTypes";

interface Dragon {
  id: string;
  name: string;
  type: string;
  histories: string;
  createdAt: string;
}

interface RouteParams {
  id: string;
}

export const DragonDetails = () => {
  const classes = useStyles();

  const { id } = useParams<RouteParams>();
  const { data: dragon } = useFetch<Dragon, Error>(`dragon/${id}`);
  const { goBack } = useHistory();

  // if (!dragon) return (<p>Carregando...</p>)

  return (
    <Layout
      breadcrumbs={[
        { name: 'Home', href: '/' },
        { name: 'Details' },
      ]}>
      <Card className={classes.root}>
        {dragon
          ? (
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Nome do Dragão:
            </Typography>
              <Typography variant="h3" component="h2">
                {dragon.name}
              </Typography>
              <Typography className={classes.title} color="textSecondary">
                Tipo de Dragão:
              </Typography>
              <Typography variant="h4" component="h2">
                {dragon.type}
              </Typography>
              <Typography className={classes.title} color="textSecondary">
                História do Dragão:
              </Typography>
              <Typography variant="body2" component="p">
                {dragon.histories}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Criado em: {formatDate(new Date(dragon.createdAt))}
              </Typography>
              <CardActions>
                <Button variant="contained" color="primary"
                  onClick={() => goBack()}
                >Voltar</Button>
              </CardActions>
            </CardContent>
          ) : (
            <CardContent>
              <Skeleton width="30%"></Skeleton>
              <Skeleton width="50%" height="6rem"></Skeleton>
              <Skeleton width="30%"></Skeleton>
              <Skeleton width="40%" height="5rem"></Skeleton>
              <Skeleton width="30%"></Skeleton>
              <Skeleton width="80%" height="3rem"></Skeleton>
              <Skeleton width="30%"></Skeleton>
              <Skeleton width="40%"></Skeleton>
              <Skeleton width="2rem" height="2rem"></Skeleton>
            </CardContent>
          )
        }

      </Card>
    </Layout >
  )
}


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 16,
    paddingTop: '1rem',
    fontWeight: 'bolder',
  },
  pos: {
    marginBottom: '2rem',
    marginTop: '2rem',
  },
});