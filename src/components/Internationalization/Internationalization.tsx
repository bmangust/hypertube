import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const languages = ['en', 'ru'];

const Internationalization = () => {
  const [lang, setLang] = useState(0);
  const nextLang = (lang + 1) % languages.length;
  const { t, i18n } = useTranslation();

  const handleClick = () => {
    i18n.changeLanguage(languages[nextLang]);
    setLang(nextLang);
  };
  return (
    <div>
      <Button onClick={handleClick}>{`${t('translate')} ${t(
        languages[nextLang]
      )}`}</Button>
    </div>
  );
};

export default Internationalization;
