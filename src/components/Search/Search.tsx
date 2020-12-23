import { FormControl, Grid, InputBase, makeStyles } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import React, { useState } from "react";
import { theme } from "../../theme";

interface Props {}

const useStyles = makeStyles({
  root: {
    margin: "10px",
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 5,
    maxWidth: 300,
  },
  Input: {
    padding: "10px 1rem",
    flex: 1,
  },
  BaseInput: {
    padding: 0,
  },
  Icon: {
    fontSize: "2rem",
    color: theme.palette.grey[700],
    paddingRight: 5,
  },
});

const Search = (props: Props) => {
  const classes = useStyles();
  const [search, setSearch] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(`Searching for: ${search}`);
      setSearch("");
    }
  };

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
          inputProps={{ "aria-label": "search for a movie" }}
          value={search}
          classes={{ input: classes.BaseInput }}
          onChange={handleInput}
          onKeyPress={handleSearch}
          placeholder="Search..."
        />
        <SearchRounded className={classes.Icon} />
      </Grid>
    </FormControl>
  );
};

export default Search;
