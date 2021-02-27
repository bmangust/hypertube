import React, { useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import { SnackbarProvider } from 'notistack';
import { theme } from './theme';
import { Switch, Route, useLocation } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MovieFullInfo from './components/MovieFullInfo/MovieFullInfo';
import Footer from './components/Footer/Footer';
import SnackMessage from './components/Notifier/SnackMessage/SnackMessage';
import Notifier from './components/Notifier/Notifier';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import { useAppDispatch } from './store/store';
import { getSelfInfo, getToken } from './store/features/UserSlice';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ChangeEmail from './components/ChangeEmail/ChangeEmail';
import Auth from './components/Auth/Auth';
import Settings from './components/Settings/Settings';
import { useSelector } from 'react-redux';
import { RootState } from './store/rootReducer';
import { useToast } from './hooks/useToast';
import { useTranslation } from 'react-i18next';
import { getSearchParam } from './utils';

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
  const dispatch = useAppDispatch();
  const { isAuth } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const { toast } = useToast();
  const { i18n } = useTranslation();

  useEffect(() => {
    const urlParams = getSearchParam(location.search);
    if (urlParams?.error) {
      const lang = i18n.language as 'en' | 'ru';
      toast({ text: urlParams.error[lang] as string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(getSelfInfo());
    }
  }, [dispatch]);

  const routes = isAuth ? (
    <Switch>
      <Route path="/settings" component={Settings} />
      <Route path="/forgot_password" component={ForgotPassword} />
      <Route path="/change_email" component={ChangeEmail} />
      <Route path="/reset_password" component={ResetPassword} />
      <Route path="/movies/:id" component={MovieFullInfo} />
      <Route path="/" component={MainPage} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/forgot_password" component={ForgotPassword} />
      <Route path="/movies/:id" component={MovieFullInfo} />
      <Route path="/" component={MainPage} />
    </Switch>
  );

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
          {routes}
          <Footer />
          <Notifier />
        </SnackbarProvider>
      </Container>
    </Container>
  );
}

export default App;
