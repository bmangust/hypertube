import {
  Button,
  Fade,
  FormControl,
  Grid,
  InputBase,
  makeStyles,
  Paper,
  Popper,
} from "@material-ui/core";
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
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
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
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.6rem",
      paddingRight: 0,
    },
  },
  Button: {
    margin: "10px",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  Popper: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
});

const Search = (props: Props) => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(`Searching for: ${search}`);
      setSearch("");
    }
  };
  const handleOpenSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "search-popover" : undefined;

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
        placement={"bottom-end"}
        transition
        className={classes.Popper}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Paper>
              <InputBase
                className={classes.Input}
                inputProps={{ "aria-label": "search for a movie" }}
                value={search}
                classes={{ input: classes.BaseInput }}
                onChange={handleInput}
                onKeyPress={handleSearch}
                placeholder="Search..."
              />
            </Paper>
          </Fade>
        )}
      </Popper>
    </FormControl>
  );
};

export default Search;
