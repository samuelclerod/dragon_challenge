import { Button, Card, CardActions, CardContent, makeStyles, Typography } from "@material-ui/core";
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

  if (!dragon) return (<p>Carregando...</p>)

  return (
    <Layout
      breadcrumbs={[
        { name: 'Home', href: '/' },
        { name: 'Details' },
      ]}>
      <Card className={classes.root}>
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
          <Typography className={classes.title} color="textSecondary">
            Criado em:
          </Typography>
          <Typography className={[classes.pos, classes.title].join(' ')} variant="body2" component="p">
            {formatDate(new Date(dragon.createdAt))}
          </Typography>
          <CardActions>
            <Button variant="contained" color="primary"
              onClick={() => goBack()}
            >Voltar</Button>
          </CardActions>
        </CardContent>

      </Card>
    </Layout>
  )
}


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 16,
    paddingTop: 16,
    fontWeight: 'bolder',
  },
  pos: {
    marginBottom: 12,
  },
});