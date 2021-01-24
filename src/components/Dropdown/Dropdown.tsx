import { Button, Grid, makeStyles, Paper, Popper } from '@material-ui/core';
import React, { useRef, useState } from 'react';

export interface IItem {
  text: string;
  name: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
interface Props {
  heroText: string;
  icon?: JSX.Element;
  items: IItem[];
}

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  Paper: {
    padding: 20,
  },
  Open: {
    transform: 'rotate(180deg)',
  },
  Item: {
    fontSize: '1.0rem',
    margin: 5,
  },
});

const Dropdown: React.FC<Props> = ({ heroText, icon, items }) => {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef<HTMLButtonElement>(null);
  const classes = useStyles();

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    onClick: undefined | ((e: React.MouseEvent<HTMLButtonElement>) => void)
  ) => {
    onClick && onClick(e);
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Button
        style={{ margin: '0 10px' }}
        ref={anchorEl}
        variant="text"
        onClick={() => setOpen((open) => !open)}
        endIcon={icon}
      >
        {heroText}
      </Button>
      <Popper open={open} anchorEl={anchorEl.current} placement="bottom">
        <Paper className={classes.Paper}>
          <Grid container direction="column" alignItems="center">
            {items.map(({ text, name, onClick }: IItem) => (
              <Button
                key={text}
                variant="text"
                name={name}
                className={classes.Item}
                onClick={(e) => handleButtonClick(e, onClick)}
              >
                {text}
              </Button>
            ))}
          </Grid>
        </Paper>
      </Popper>
    </div>
  );
};

export default Dropdown;
