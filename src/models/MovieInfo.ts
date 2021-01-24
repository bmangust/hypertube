export interface IMovie {
  id: string;
  name: string;
  img: string;
  src: string;
  info: IMovieInfo;
}

export interface IMovieInfo {
  avalibility: number;
  year: number;
  genres: string[];
  rating: number;
  views: number;
  length: number;
  pgRating: string;
  comments?: IComment[];
  description?: string;
  photos?: string[];
  videos?: string[];
  moreLikeThis?: IMovie[];
  storyline?: string;
  directed?: IUser[];
  cast?: IUser[];
  writingCredits?: IUser[];
  produced?: IUser[];
  music?: IUser[];
  cinematography?: IUser[];
  filmEditing?: IUser[];
}

export interface IUser {
  name: string;
  photo?: string[];
  knownFor?: IMovie[];
  filmography?: IFilmography[];
  otherWorks?: string[];
  publicityListings?: string[];
  ofiicialSites?: string[];
  alternateNames?: string[];
  starSign?: string;
  born?: number;
  bornPlace?: string;
  birthName?: string;
  height?: number;
  bio?: string;
  tradeMark?: string[];
  trivia?: string[];
  personalQuotes?: string[];
}

export interface IFilmography {
  id?: string;
  job: string; //'actor', 'director'...
  movies: IMovie[];
}

export interface IComment {
  id: number;
  authorId: number;
  text: string;
}
