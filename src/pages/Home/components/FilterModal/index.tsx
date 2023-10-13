import Modal from 'react-modal';

import { Button } from '@components/Button';
import { Text } from '@components/Text';
import Select from 'react-select';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useStore } from '@hooks/store';
import { CATEGORY_ICONS } from '@utils/models/Category';
import { ApiService } from '@services/ApiService';
import { Loader } from '@components/Loader';
import { useSearchParams } from 'react-router-dom';
import { useRentxToast } from '@hooks/useToast';
import { CategoryCard, Divider, ModalHeader, ModalSection } from './styles';
import RangeSelector, { MAX_RANGE_VALUE, MIN_RANGE_VALUE } from './components/RangeSelector';

Modal.setAppElement('#root');

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

const custommModalStyles = {
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

type Option = {
  value: string;
  label: string;
};

function SectionLoading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
      }}
    >
      <Loader />
    </div>
  );
}

export function FilterModal({ open, onClose }: ModalProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const api = useMemo(() => new ApiService(), []);
  const { categories, setCategories, brands, setBrands } = useStore();
  const { createBasicToast } = useRentxToast();

  const [priceRangeValues, setPriceRangeValues] = useState([MIN_RANGE_VALUE, MAX_RANGE_VALUE]);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [brand, setBrand] = useState<Option | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const clearAllFilters = () => {
    setPriceRangeValues([MIN_RANGE_VALUE, MAX_RANGE_VALUE]);
    setSelectedOptions([]);
    setBrand(null);
  };

  const fetchData = useCallback(async () => {
    try {
      if (!categories.length) {
        setLoading(true);
        const categoriesList = await api.getCategories();
        setCategories(categoriesList);
      }

      if (!brands.length) {
        setLoading(true);
        const brandsList = await api.getCarBrands();
        setBrands(brandsList);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      createBasicToast('error', 'Não foi possível carregar os filtros, tente novamente mais tarde');
    }
  }, [api, brands.length, categories.length, createBasicToast, setBrands, setCategories]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOptionClick = useCallback(
    (option: Option) => {
      const index = selectedOptions.findIndex((o) => o.value === option.value);
      if (index === -1) {
        setSelectedOptions((prev) => [...prev, option]);
      } else {
        setSelectedOptions((prev) => prev.filter((o) => o.value !== option.value));
      }
    },
    [selectedOptions],
  );

  const isOptionSelected = useCallback(
    (option: Option) => selectedOptions.findIndex((o) => o.value === option.value) !== -1,
    [selectedOptions],
  );

  const renderCards = useCallback(
    () =>
      categories.map((category) => {
        const Icon = CATEGORY_ICONS[category.name];
        return (
          <CategoryCard
            key={category.id}
            type='button'
            onClick={() => handleOptionClick({ value: category.name, label: category.name })}
            selected={isOptionSelected({ value: category.name, label: category.name })}
          >
            <Icon />
            <Text size='medium' weight='medium'>
              {category.displayName}
            </Text>
          </CategoryCard>
        );
      }),
    [categories, handleOptionClick, isOptionSelected],
  );

  const brandOptions = useMemo(
    () =>
      brands
        .map((currBrand) => ({
          value: currBrand,
          label: currBrand,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [brands],
  );

  const localOnClose = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    const currentPriceRange = searchParams.get('priceRange') ?? '';
    const currentCategories = searchParams.get('categories') ?? '';
    const currentBrand = searchParams.get('brand') ?? '';

    const newPriceRange = priceRangeValues.join(',');
    const newCategories = selectedOptions.map((o) => o.value).join(',');
    const newBrand = brand?.value ?? '';

    let shouldBeUpdated = false;

    if (newPriceRange === [MIN_RANGE_VALUE, MAX_RANGE_VALUE].join(',')) {
      newSearchParams.delete('priceRange');
      shouldBeUpdated = true;
    } else if (currentPriceRange !== newPriceRange) {
      newSearchParams.set('priceRange', newPriceRange);
      shouldBeUpdated = true;
    }

    if (currentCategories !== newCategories) {
      if (!newCategories) {
        newSearchParams.delete('categories');
        shouldBeUpdated = true;
      } else {
        newSearchParams.set('categories', newCategories);
        shouldBeUpdated = true;
      }
    }

    if (currentBrand !== newBrand) {
      if (!newBrand) {
        newSearchParams.delete('brand');
        shouldBeUpdated = true;
      } else {
        newSearchParams.set('brand', newBrand);
        shouldBeUpdated = true;
      }
    }

    if (shouldBeUpdated) setSearchParams(newSearchParams);

    onClose();
  }, [brand?.value, onClose, priceRangeValues, searchParams, selectedOptions, setSearchParams]);

  return (
    <Modal isOpen={open} onRequestClose={onClose} style={custommModalStyles}>
      <ModalHeader>
        <Text size='xxlarge' weight='semibold' family='archivo' color='gray700'>
          Filtro
        </Text>

        <Button variant='ghost' onClick={clearAllFilters}>
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
            R$ {priceRangeValues[0]} - R$ {priceRangeValues[1]}
          </Text>
        </div>
        {loading ? (
          <SectionLoading />
        ) : (
          <RangeSelector values={priceRangeValues} setValues={setPriceRangeValues} />
        )}
      </ModalSection>

      <ModalSection id='categories'>
        <Text size='xlarge' weight='medium' family='archivo' color='gray700'>
          Combustível
        </Text>

        {loading ? <SectionLoading /> : <div id='category-cards-container'>{renderCards()}</div>}
      </ModalSection>

      <ModalSection id='brands'>
        <Text size='xlarge' weight='medium' family='archivo' color='gray700'>
          Marcas
        </Text>

        {loading ? (
          <SectionLoading />
        ) : (
          <Select
            options={brandOptions}
            placeholder='Selecione uma marca'
            isClearable
            value={brand}
            onChange={(option) => setBrand(option)}
            closeMenuOnScroll
            maxMenuHeight={80}
          />
        )}
      </ModalSection>

      <Button onClick={localOnClose}>Confirmar</Button>
    </Modal>
  );
}
