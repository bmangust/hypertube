import { Button, Grid, makeStyles, Paper, Popper } from '@material-ui/core';
import React, { useRef, useState } from 'react';

interface IItem {
  text: string;
  onClick?: () => {};
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
    minWidth: 300,
  },
  Open: {
    transform: 'rotate(180deg)',
  },
  Item: {
    fontSize: '1.0rem',
    margin: 16,
  },
});

const Dropdown: React.FC<Props> = ({ heroText, icon, items }) => {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef<HTMLButtonElement>(null);
  const classes = useStyles();

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
          <Grid container direction="column" alignItems="flex-start">
            {items.map((item) => (
              <Button
                fullWidth
                key={item.text}
                variant="text"
                className={classes.Item}
                onClick={item.onClick}
              >
                {item.text}
              </Button>
            ))}
          </Grid>
        </Paper>
      </Popper>
    </div>
  );
};

export default Dropdown;
