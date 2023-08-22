import { Button } from '../../components/Button';
import { Text } from '../../components/Text';

export function NotFound() {
  return (
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
        }}
      >
        <Button buttonType='secondary'>
          <Text size='medium' weight='medium' family='archivo'>
            Oi
          </Text>
        </Button>
      </div>
    </main>
  );
}
