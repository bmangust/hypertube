import { Grid, makeStyles, TextField } from "@material-ui/core";
import React from "react";

export interface LoginProps {}

const useStyles = makeStyles({
  root: {
    padding: "2rem 1rem",
    backgroundColor: "#00000033",
    backdropFilter: "blur(40)",
    boxShadow: "2px 2px 10px #00000033",
    borderRadius: 10,
    zIndex: 2,
  },
});

const Login: React.FC<LoginProps> = (props: LoginProps) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.root}
      xs={12}
      sm={10}
      md={8}
    >
      <TextField />
    </Grid>
  );
};

export default Login;
