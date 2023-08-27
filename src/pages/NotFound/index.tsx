import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Button } from '../../components/Button';
import { FormTextInput } from '../../components/FormTextInput';
import { Text } from '../../components/Text';
import { ReactComponent as MailIcon } from '../../assets/envelope.svg';
import { ReactComponent as EyeIcon } from '../../assets/eye.svg';
import { Checkbox } from '../../components/Checkbox';

type FormDataTypes = {
  myInput: string;
  myInput2: string;
};

export function NotFound() {
  const methods = useForm<FormDataTypes>({
    defaultValues: {
      myInput: '',
      myInput2: '',
    },
  });

  const onSubmit = (data: FormDataTypes) => console.log(data);
  const setInputError = () => {
    // methods.setError('myInput', { type: 'manual', message: 'Error message' });
    methods.setError('myInput2', { type: 'manual', message: 'Invalid input. Please try again' });
  };

  useEffect(() => {
    console.info(methods.formState.errors);
  }, [methods.formState.errors]);

  if (methods.formState.isLoading) return null;

  return (
    <FormProvider {...methods}>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          gap: '1rem',
        }}
      >
        <Text as='h1' color='blackPrimary' size='huge' weight='bold'>
          404
        </Text>
        <Text color='blackPrimary' size='medium'>
          Page not found
        </Text>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '30%',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <FormTextInput
            name='myInput'
            labelIcon={MailIcon}
            placeholder='E-mail'
            rightIcon={EyeIcon}
            onRightIconClick={setInputError}
          />

          <FormTextInput
            name='myInput2'
            labelIcon={MailIcon}
            placeholder='E-mail'
            rightIcon={EyeIcon}
            onRightIconClick={setInputError}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '30%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button onClick={methods.handleSubmit(onSubmit)}>
            <Text size='medium' weight='medium'>
              Login
            </Text>
          </Button>
        </div>

        <Checkbox />
      </main>
    </FormProvider>
  );
}
