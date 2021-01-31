import { Grid } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Grid
      container
      alignItems="flex-end"
      justify="flex-end"
      style={{ width: '100%', marginBottom: 10 }}
    >
      {t`footerCreated`}
    </Grid>
  );
};

export default Footer;
