import { Text } from '@components/Text';

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
    </main>
  );
}
