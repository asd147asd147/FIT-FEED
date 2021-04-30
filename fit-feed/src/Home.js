import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { blue } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import facebook from "./facebook.json";
import Head from "./Head"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        FIT-FEED
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: '0.3s',
    '&:hover':{
      transform: 'translateY(-1%)',
      position: 'relative',
      top: '-10px',
    },
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  avatar: {
    backgroundColor: blue[500],
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Head />
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              FIT-FEED
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Facebook, Instargram, Twitter Feed를 모아 볼 수 있는 웹 서비스.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="xl">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {facebook.map((info, card) => (
              <Grid item key={card} xs={12} sm={6} md={3}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                          <Avatar aria-label="recipe" className={classes.avatar}>
                            C
                        </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        }
                        title="Choi Won June"
                        subheader="March 03 2021"
                    />
                  <CardMedia
                    className={classes.cardMedia}
                    image={info.pageImage.src}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {info.pageName}
                    </Typography>
                    <Typography>
                      {info.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Made in RLBUG
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}