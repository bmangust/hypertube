import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import { SnackbarProvider } from 'notistack';
import { theme } from './theme';
import { Switch, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MovieFullInfo from './components/MovieFullInfo/MovieFullInfo';
import Footer from './components/Footer/Footer';
import SnackMessage from './components/Notifier/SnackMessage/SnackMessage';
import Notifier from './components/Notifier/Notifier';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    minWidth: 500,
    margin: 0,
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  Wrapper: {
    maxWidth: 840,
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      margin: 0,
    },
  },
  Slider: {
    height: 400,
    minHeight: 300,
  },
});

function App() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Container className={classes.Wrapper}>
        <SnackbarProvider
          maxSnack={3}
          classes={{ containerRoot: classes.root }}
          content={(key: string) => <SnackMessage id={key} />}
        >
          <Header />
          <Nav />
          <Switch>
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/movies/:id" component={MovieFullInfo} />
            <Route path="/" component={MainPage} />
          </Switch>
          <Footer />
          <Notifier />
        </SnackbarProvider>
      </Container>
    </Container>
  );
}

export default App;
