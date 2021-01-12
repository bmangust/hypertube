import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface Props {}

const Internationalization = (props: Props) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div>
      <Typography>{t('Welcome')}</Typography>
      <Button onClick={() => changeLanguage('en')}>en</Button>
      <Button onClick={() => changeLanguage('fr')}>fr</Button>
    </div>
  );
};

export default Internationalization;
