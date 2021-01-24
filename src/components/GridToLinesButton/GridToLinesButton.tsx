import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { DashboardRounded, ViewAgendaRounded } from '@material-ui/icons';

interface Props {}

const useStyles = makeStyles({
  right: {
    grow: 1,
    marginLeft: 'auto',
  },
});

const GridToLinesButton = (props: Props) => {
  const classes = useStyles();
  const [isGrid, setIsGrid] = useState(false);

  return (
    <Button
      className={classes.right}
      variant="text"
      size="large"
      onClick={() => setIsGrid((isGrid) => !isGrid)}
    >
      {isGrid ? <DashboardRounded /> : <ViewAgendaRounded />}
    </Button>
  );
};

export default GridToLinesButton;
