import {
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { TuneRounded } from '@material-ui/icons';
import React, { useState } from 'react';

const useStyles = makeStyles({
  '@media (orientation: portrait)': {
    root: {
      width: '80vw',
      height: '60vh',
    },
  },
  root: {
    minWidth: 300,
    minHeight: 300,
    width: '80vw',
    height: '60vh',
    '@media (max-width: 600px)': {
      width: '90vw',
      height: '90vh',
    },
  },
  Actions: {
    justifyContent: 'center',
  },
});

interface IGenres {
  Action: boolean;
  Comedy: boolean;
  Comics: boolean;
  Drama: boolean;
  Fantasy: boolean;
  Family: boolean;
  Horror: boolean;
  Romance: boolean;
  'Sci-Fi': boolean;
  Thriller: boolean;
  Western: boolean;
}
type GenresKeys = keyof IGenres;
interface IYears {
  'before 1980': boolean;
  '1980-1990': boolean;
  '1990-2000': boolean;
  '2000-2010': boolean;
  '2010-2020': boolean;
}
type YearsKeys = keyof IYears;
interface ICountries {
  Australia: boolean;
  Canada: boolean;
  France: boolean;
  Germany: boolean;
  'Great Britain': boolean;
  India: boolean;
  Japan: boolean;
  Russia: boolean;
  Spain: boolean;
  USA: boolean;
  USSR: boolean;
}
type CountriesKeys = keyof ICountries;

const buttons: ['genres', 'years', 'countries'] = [
  'genres',
  'years',
  'countries',
];
const items = {
  genres: [
    'Action',
    'Comedy',
    'Comics',
    'Drama',
    'Fantasy',
    'Family',
    'Horror',
    'Romance',
    'Sci-Fi',
    'Thriller',
    'Western',
  ] as GenresKeys[],
  years: [
    'before 1980',
    '1980-1990',
    '1990-2000',
    '2000-2010',
    '2010-2020',
  ] as YearsKeys[],
  countries: [
    'Australia',
    'Canada',
    'France',
    'Germany',
    'Great Britain',
    'India',
    'Japan',
    'Russia',
    'Spain',
    'USA',
    'USSR',
  ] as CountriesKeys[],
  // additional: ['subtitles', 'HD', 'Multi-audio'],
};

const initialFilterState = {
  genres: {
    Action: false,
    Comedy: false,
    Comics: false,
    Drama: false,
    Fantasy: false,
    Family: false,
    Horror: false,
    Romance: false,
    'Sci-Fi': false,
    Thriller: false,
    Western: false,
  },
  years: {
    'before 1980': false,
    '1980-1990': false,
    '1990-2000': false,
    '2000-2010': false,
    '2010-2020': false,
  },
  countries: {
    Australia: false,
    Canada: false,
    France: false,
    Germany: false,
    'Great Britain': false,
    India: false,
    Japan: false,
    Russia: false,
    Spain: false,
    USA: false,
    USSR: false,
  },
  // additional: { subtitles: false, HD: false, 'Multi-audio': false },
};

const Filter = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<'genres' | 'years' | 'countries'>(
    'genres'
  );
  const [filterState, setFilterState] = useState(initialFilterState);

  const handleReset = () => {
    console.log('[Filter] handleReset');
    setFilterState(initialFilterState);
  };
  const handleShow = async () => {
    console.log('[Filter] handleShow', filterState);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterState({
      ...filterState,
      [category]: {
        ...filterState[category],
        [e.currentTarget.name]: e.currentTarget.checked,
      },
    });
  };

  const getCheckboxes = (category: string): JSX.Element[] | null => {
    switch (category) {
      case 'genres':
        return items.genres.map((item) => (
          <Grid key={item} item xs={6} sm={4}>
            <FormControlLabel
              control={
                <Checkbox
                  style={{ marginLeft: 20 }}
                  checked={filterState['genres'][item]}
                  onChange={handleFilterChange}
                  name={item}
                  color="primary"
                />
              }
              label={item}
            />
          </Grid>
        ));
      case 'years':
        return items.years.map((item: YearsKeys) => (
          <Grid key={item} item xs={6} sm={4}>
            <FormControlLabel
              control={
                <Checkbox
                  style={{ marginLeft: 20 }}
                  checked={filterState['years'][item]}
                  onChange={handleFilterChange}
                  name={item}
                  color="primary"
                />
              }
              label={item}
            />
          </Grid>
        ));
      case 'countries':
        return items.countries.map((item: CountriesKeys) => (
          <Grid key={item} item xs={6} sm={4}>
            <FormControlLabel
              control={
                <Checkbox
                  style={{ marginLeft: 20 }}
                  checked={filterState['countries'][item]}
                  onChange={handleFilterChange}
                  name={item}
                  color="primary"
                />
              }
              label={item}
            />
          </Grid>
        ));
      default:
        return null;
    }
  };

  return (
    <div>
      <Button
        variant="text"
        onClick={() => setOpen(true)}
        startIcon={<TuneRounded />}
      >
        Filter
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="filter-dialog"
        classes={{ paper: classes.root }}
      >
        <DialogTitle id="filter-dialog-title">Filter</DialogTitle>
        <DialogContent>
          <Grid container direction="column" alignItems="center">
            <ButtonGroup style={{ marginBottom: 20 }}>
              {buttons.map((text) => (
                <Button
                  color="primary"
                  variant={text === category ? 'contained' : 'outlined'}
                  key={text}
                  onClick={() => setCategory(text)}
                >
                  {text}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>
          <Grid container wrap="wrap">
            {getCheckboxes(category)}
          </Grid>
        </DialogContent>
        <DialogActions className={classes.Actions}>
          <Button onClick={handleReset} color="primary">
            Reset filters
          </Button>
          <Button onClick={handleShow} color="secondary">
            Show results
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Filter;
