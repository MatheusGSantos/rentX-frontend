import Modal from 'react-modal';

import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { Divider, ModalHeader, ModalSection } from './styles';

Modal.setAppElement('#root');

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 375,
    padding: '24px',
    borderRadius: '8px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 9999,
  },
};

export function FilterModal({ open, onClose }: ModalProps) {
  return (
    <Modal isOpen={open} onRequestClose={onClose} style={customStyles}>
      <ModalHeader>
        <Text size='xxlarge' weight='semibold' family='archivo' color='gray700'>
          Filtro
        </Text>

        <Button variant='ghost' onClick={() => {}}>
          Limpar todos
        </Button>
      </ModalHeader>

      <Divider />

      <ModalSection id='price-range-slider'>
        <div className='section-title'>
          <Text size='xlarge' weight='medium' family='archivo' color='gray700'>
            Preço ao dia
          </Text>
          <Text size='small' weight='medium' color='redPrimary'>
            R$ 160 - R$ 380
          </Text>
        </div>
        <div id='slider' />
      </ModalSection>

      <ModalSection id='categories'>
        <Text size='xlarge' weight='medium' family='archivo' color='gray700'>
          Combustível
        </Text>

        <div id='cards' />
      </ModalSection>

      <ModalSection>
        <Text size='xlarge' weight='medium' family='archivo' color='gray700'>
          Marcas
        </Text>

        <div id='select' />
      </ModalSection>

      <Button onClick={() => {}}>Confirmar</Button>
    </Modal>
  );
}
