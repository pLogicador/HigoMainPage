// default data for filter elements
export const priceInit = {
  0: 'R$0',
  100: 'R$100',
};

export const calenderItem = {
  separator: '-',
  format: 'MM-DD-YYYY',
  locale: 'pt-Br',
};

export const getAmenities = {
  id: 1,
  name: 'Comodidades',
  identifier: 'amenities',
  options: [
    { label: 'Wi-Fi Grátis', value: 'free-wifi' },
    { label: 'Estacionamento gratis', value: 'free-parking' },
    { label: 'Café da manhã', value: 'breakfast' },
    { label: 'Piscina', value: 'pool' },
    { label: 'Ar condicionado', value: 'air-condition' },
    { label: 'Chuveiro quente', value: 'hot-shower' },
    { label: 'TV a cabo', value: 'cable-tv' },
  ],
};

export const getPropertyType = {
  id: 2,
  name: 'Tipo',
  identifier: 'property-type',
  options: [
    { label: 'Villa', value: 'villa' },
    { label: 'Hotel', value: 'hotel' },
    { label: 'Resort', value: 'resort' },
    { label: 'Cottage', value: 'cottage' },
    { label: 'Duplex', value: 'duplex' },
    { label: 'Landscape', value: 'landscape' },
  ],
};
