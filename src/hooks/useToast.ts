import { addSnack, IVariant } from '../store/features/SnackSlice';
import { v4 as uuid } from 'uuid';
import { useAppDispatch } from '../store/store';

interface IMessage {
  text: string;
  header?: string;
}

export const useToast = () => {
  const dispatch = useAppDispatch();

  const toast = (
    message: IMessage,
    variant: IVariant = 'success',
    options = {}
  ) => {
    dispatch(
      addSnack({
        key: uuid(),
        text: message.text,
        header: message.header,
        variant: variant || 'default',
        options: { ...options, autoHideDuration: 3000 },
      })
    );
  };

  return { toast };
};
