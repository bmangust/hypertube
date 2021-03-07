import {
  Button,
  Fade,
  FormControl,
  Grid,
  InputBase,
  makeStyles,
  Paper,
  Popper,
  TextField,
} from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { theme } from '../../theme';
import { search as axiosSearch } from '../../axios';
import { useAppDispatch } from '../../store/store';
import { setMovies } from '../../store/features/MoviesSlice';

const useStyles = makeStyles({
  root: {
    margin: '10px',
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 5,
    maxWidth: 300,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  Input: {
    padding: '5px 1rem',
    flex: 1,
  },
  BaseInput: {
    padding: 0,
  },
  Icon: {
    fontSize: '2rem',
    color: theme.palette.grey[700],
    paddingRight: 5,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.6rem',
      paddingRight: 0,
    },
  },
  Button: {
    margin: '10px',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  Popper: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
});

const Search = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { t } = useTranslation();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(`Searching for: ${search}`);
      const res = await axiosSearch('find', {
        params: {
          category: 'Movies',
          search,
        },
      });
      console.log(res);
      if (res.data.status) {
        dispatch(setMovies({ movies: res.data.data }));
      }
      setSearch('');
    }
  };
  const handleOpenSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'search-popover' : undefined;

  return (
    <FormControl>
      <Grid
        container
        alignItems="center"
        justify="flex-end"
        className={classes.root}
      >
        <InputBase
          className={classes.Input}
          inputProps={{ 'aria-label': 'search for a movie' }}
          value={search}
          classes={{ input: classes.BaseInput }}
          onChange={handleInput}
          onKeyPress={handleSearch}
          placeholder={t('search')}
        />
        <SearchRounded className={classes.Icon} />
      </Grid>

      <Button
        aria-describedby={id}
        className={classes.Button}
        onClick={handleOpenSearch}
        variant="outlined"
      >
        <SearchRounded className={classes.Icon} />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={'bottom-end'}
        transition
        className={classes.Popper}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Paper>
              <TextField
                size="small"
                className={classes.Input}
                inputProps={{ 'aria-label': 'search for a movie' }}
                value={search}
                classes={{ root: classes.BaseInput }}
                onChange={handleInput}
                onKeyPress={handleSearch}
                placeholder={t('search')}
              />
            </Paper>
          </Fade>
        )}
      </Popper>
    </FormControl>
  );
};

export default Search;
