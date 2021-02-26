import React, { useState } from 'react';
import {
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { PlayArrow, StarBorder } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import { Link, NavLink } from 'react-router-dom';
import { IMovie, IUser } from '../../models/MovieInfo';
import { useTranslation } from 'react-i18next';
import { primaryColor } from '../../theme';
import { movies } from '../../axios';
import { getToken } from '../../store/features/UserSlice';

interface MovieCardMediumProps {
  card: IMovie;
}

// const svg =
//   '<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="#ffffff"></path></svg>';

const useStyles = makeStyles({
  Paper: {
    display: 'flex',
    marginBottom: 20,
    padding: 10,
  },
  Img: {
    position: 'relative',
    cursor: 'pointer',
    '& img': {
      height: '15rem',
      width: '10rem',
      objectFit: 'cover',
      marginRight: 20,
      borderRadius: 5,
    },
    // '&::after': {
    //   //   content: "''",
    //   content: `url('data:image/svg+xml; utf8, ${svg}')`,
    //   position: 'absolute',
    //   width: '100px',
    //   height: '100px',
    //   left: 0,
    //   top: 0,
    //   opacity: 1,
    //   padding: '1rem',
    //   borderRadius: '50%',
    //   color: '#fff',
    //   zIndex: 1,
    // },
    // '&:hover::after': {
    //   opacity: 1,
    // },
    '&:hover $PlayIconWrapper': {
      opacity: 1,
    },
  },
  PlayIconWrapper: {
    position: 'absolute',
    left: 'calc(50% - 3.5rem)',
    top: 'calc(50% - 3rem)',
    fontSize: '1rem',
    padding: '1rem',
    borderRadius: '50%',
    backgroundColor: '#000000aa',
    color: '#fff',
    opacity: 0,
    transition: '0.3s',
  },
  PlayIcon: {
    width: '4rem',
    height: '4rem',
  },
  Info: {
    height: '15rem',
    flexWrap: 'nowrap',
  },
  Caption: {
    fontSize: '1.5rem',
    textDecoration: 'none',
    color: 'inherit',
    marginBottom: 10,
  },
  Text: {
    fontSize: '1rem',
    fontWeight: 200,
  },
  Description: {
    maxHeight: '8rem',
    paddingTop: 10,
    fontSize: '0.9rem',
    position: 'relative',
    flexGrow: 2,
    overflow: 'hidden',
  },
  Shadow: {
    height: 40,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    background: 'linear-gradient(0deg, #ffffff, #ffffff33)',
  },
  Link: {
    marginLeft: 5,
    fontSize: 'inherit',
    fontWeight: 'inherit',
    color: 'inherit',
    textTransform: 'capitalize',
    '&:hover': {
      color: primaryColor.light,
    },
  },
});

const MovieCardMedium = ({
  card: { id, title, img, info },
}: MovieCardMediumProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [rating, setRating] = useState(info.rating);

  const handleRatingChange = async (
    e: React.ChangeEvent<{}>,
    newRating: number | null
  ) => {
    e.stopPropagation();
    if (newRating !== null) {
      console.log(newRating);
      const res = await movies.patch(
        '/rating',
        { id, rating: newRating },
        {
          headers: {
            accessToken: getToken(),
          },
        }
      );
      if (res.data.status) setRating(res.data.data);
    }
  };

  const mapItemsToLinks = (
    items: (string | IUser)[] | undefined
  ): JSX.Element[] | string => {
    if (!items || !items.length) return t('No info');
    return items.map((item: string | IUser) => {
      const text = typeof item === 'string' ? item : item.name;
      return (
        <Link to={`/genres/${text}`} key={text} className={classes.Link}>
          {t(text)}
        </Link>
      );
    });
  };

  return (
    <Paper className={classes.Paper}>
      <NavLink to={`/movies/${id}`} className={classes.Img}>
        <img src={img} alt={`${title} poster`} />
        <div className={classes.PlayIconWrapper}>
          <PlayArrow className={classes.PlayIcon} fontSize="large" />
        </div>
      </NavLink>
      <Grid container direction="column" className={classes.Info}>
        <Grid container alignItems="baseline" justify="space-between">
          <NavLink to={`/movies/${id}`} className={classes.Caption}>
            <Typography variant="caption" className={classes.Caption}>
              {title}
            </Typography>
          </NavLink>
          <Rating
            value={rating}
            name={`${id}-${title.replace(' ', '-')}-rating`}
            emptyIcon={<StarBorder fontSize="inherit" />}
            onChange={handleRatingChange}
          />
        </Grid>
        {/* <Divider /> */}
        <Grid container className={classes.Text}>
          {t('Year')}: {info.year}
        </Grid>
        <Grid container className={classes.Text}>
          {t('Genres')}: {mapItemsToLinks(info.genres)}
        </Grid>
        <Grid container className={classes.Text}>
          {t('Length')}: {info.length} {t('min')}
        </Grid>
        <Divider />
        <Grid container className={classes.Description}>
          {info.description}
          <div className={classes.Shadow} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MovieCardMedium;
