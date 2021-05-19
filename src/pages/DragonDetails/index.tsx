import { Button, Card, CardActions, CardContent, makeStyles, Typography as T } from "@material-ui/core";
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
              <T className={classes.title}
                color="textSecondary"
                gutterBottom>
                Nome do Dragão:
              </T>
              <T variant="h3"
                component="h2">
                {dragon.name}
              </T>
              <T className=
                {classes.title}
                color="textSecondary">
                Tipo de Dragão:
                  </T>
              <T variant="h4"
                component="h2">
                {dragon.type}
              </T>
              <T className=
                {classes.title}
                color="textSecondary">
                História do Dragão:
                  </T>
              <T variant="body2" component="p">
                {dragon.histories}</T>
              <T className={classes.pos}
                color="textSecondary">
                Criado em: {formatDate(new Date(dragon.createdAt))}
              </T>
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