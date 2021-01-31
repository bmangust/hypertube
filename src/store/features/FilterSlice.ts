import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { AppDispatch } from '../store';
import { IFilter, loadMovies } from './MoviesSlice';

export interface IGenres {
  Adventure: boolean;
  Arthouse: boolean;
  Action: boolean;
  Comedy: boolean;
  Comics: boolean;
  Detective: boolean;
  Drama: boolean;
  Fantasy: boolean;
  Family: boolean;
  Horror: boolean;
  Melodrama: boolean;
  Musical: boolean;
  Romance: boolean;
  'Sci-Fi': boolean;
  Sport: boolean;
  Thriller: boolean;
  Western: boolean;
}
export type GenresKeys = keyof IGenres;
export interface IYears {
  'before 1980': boolean;
  '1980-1990': boolean;
  '1990-2000': boolean;
  '2000-2010': boolean;
  '2010-2020': boolean;
}
export type YearsKeys = keyof IYears;
export interface ICountries {
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
  other: boolean;
}
export type CountriesKeys = keyof ICountries;

export const items = {
  genres: [
    'Adventure',
    'Arthouse',
    'Action',
    'Comedy',
    'Comics',
    'Detective',
    'Drama',
    'Fantasy',
    'Family',
    'Horror',
    'Melodrama',
    'Musical',
    'Romance',
    'Sci-Fi',
    'Sport',
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
    'other',
  ] as CountriesKeys[],
  // additional: ['subtitles', 'HD', 'Multi-audio'],
};

export interface GenresItem {
  category: 'genres';
  name: GenresKeys;
  value: boolean;
}

export interface YearsItem {
  category: 'years';
  name: YearsKeys;
  value: boolean;
}

export interface CountriesItem {
  category: 'countries';
  name: CountriesKeys;
  value: boolean;
}

export interface SetFilterPayload {
  filter: GenresItem | YearsItem | CountriesItem;
}

export interface FilterState {
  genres: IGenres;
  years: IYears;
  countries: ICountries;
}
export type FilterStateKeys = keyof FilterState;

const initialState = {
  genres: {
    Adventure: false,
    Arthouse: false,
    Action: false,
    Comedy: false,
    Comics: false,
    Detective: false,
    Drama: false,
    Fantasy: false,
    Family: false,
    Horror: false,
    Melodrama: false,
    Musical: false,
    Romance: false,
    'Sci-Fi': false,
    Sport: false,
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
    other: false,
  },
  // additional: { subtitles: false, HD: false, 'Multi-audio': false },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterState(state, { payload }: PayloadAction<SetFilterPayload>) {
      const { category, name, value } = payload.filter;
      return {
        ...state,
        [category]: {
          ...state[category],
          [name]: value,
        },
      };
    },
    resetFilterState() {
      return initialState;
    },
  },
});

const getYearsFilter = (years: IYears): number[][] | [] => {
  const yearsArray = items.years.filter(
    (value) => years[value] && [value, years[value]]
  );

  const result: number[][] = [];
  yearsArray.forEach((year) => {
    if (year.startsWith('before')) {
      result.push([0, 1980]);
    } else if (
      result.length > 0 &&
      year.match(`${result[result.length - 1][1]}`)
    ) {
      // if last value in result contains one of current years
      // (actually, if it's true - should find the first one)
      // then we replace that year with the second one
      const arr = year.split('-');
      result[result.length - 1][1] = +arr[1];
    } else {
      const arr = year.split('-');
      result.push([+arr[0], +arr[1]]);
    }
  });
  console.log(result);
  return result;
};

/**
 * Requests movies, based on filterState.
 * Empty or object with fields required.
 * @param param0 object with _limit and _start fields
 */
export const reqeuestMoviesWithFilters = (
  filter: IFilter = {
    _limit: 20,
    _start: 0,
  }
) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const filterState = getState().filter;
  const genres = items.genres.filter(
    (value) => filterState.genres[value] && [value, filterState.genres[value]]
  );
  const years = getYearsFilter(filterState.years);
  const countries = items.countries.filter(
    (value) =>
      filterState.countries[value] && [value, filterState.countries[value]]
  );
  const filterParams = { ...filter, genres, years, countries };

  console.log(filterParams);
  dispatch(loadMovies({ filter: filterParams }));
};

export const { setFilterState, resetFilterState } = filterSlice.actions;

export default filterSlice.reducer;
