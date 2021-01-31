import React from 'react';
import { SortRounded } from '@material-ui/icons';

import { useAppDispatch } from '../../store/store';
import { setSortingBy } from '../../store/features/UISlice';
import Dropdown, { IItem } from '../Dropdown/Dropdown';

const Sort = () => {
  const dispatch = useAppDispatch();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) =>
    dispatch(setSortingBy({ sortBy: e.currentTarget.name }));

  const items = [
    {
      text: 'By rating',
      name: 'rating',
      onClick,
    },
    {
      text: 'By name',
      name: 'name',
      onClick,
    },
    {
      text: 'By year',
      name: 'year',
      onClick,
    },
    {
      text: 'By avalibility',
      name: 'avalibility',
      onClick,
    },
  ] as IItem[];

  return <Dropdown heroText="Sort" icon={<SortRounded />} items={items} />;
};

export default Sort;
