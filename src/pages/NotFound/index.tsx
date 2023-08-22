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
      }}
    >
      <Text as='h1' color='whitePrimary' size='huge' weight='bold'>
        404
      </Text>
      <Text color='whitePrimary' size='medium'>
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
        <Button buttonType='primary'>
          <Text size='medium' weight='medium'>
            Oi
          </Text>
        </Button>
      </div>
    </main>
  );
}
