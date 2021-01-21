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
  ],
  years: ['before 1980', '1980-1990', '1990-2000', '2000-2010', '2010-2020'],
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
  ],
  additional: ['subtitles', 'HD', 'Multi-audio'],
};

const Filter = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<'genres' | 'years' | 'countries'>(
    'genres'
  );

  const handleReset = () => {
    console.log('[Filter] handleReset');
  };
  const handleShow = () => {
    console.log('[Filter] handleShow');
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
            {items[category].map((item: string) => (
              <Grid key={item} item xs={6} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ marginLeft: 20 }}
                      checked={false}
                      // onChange={handleChange}
                      name={item}
                      color="primary"
                    />
                  }
                  label={item}
                />
              </Grid>
            ))}
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
