export const customStyles = {
  control: (provided: any, state: any) => ({
  ...provided,
  width: '100%',
  minHeight: '34px',           // un poquito más alto
  height: '34px',
  padding: '0 1rem',           // padding horizontal
  border: '1px solid rgba(232,227,211,0.1)',
  borderRadius: '0.5rem',
  background: '#242938',
  boxSizing: 'border-box',
  boxShadow: state.isFocused ? '0 0 0 1.5px #00D0FF46' : 'none',
  borderColor: state.isFocused ? 'transparent' : 'rgba(232,227,211,0.1)',
  cursor: 'text',
  display: 'flex',
  alignItems: 'center',        // centra verticalmente
  justifyContent: 'flex-start',
}),
input: (provided: any) => ({
  ...provided,
  margin: 0,
  padding: 0,
  color: '#E8E3D3',
  fontSize: '0.9rem',          // un poquito más grande
  lineHeight: '1.25',
  textAlign: 'left',
}),
singleValue: (provided: any) => ({
  ...provided,
  color: '#E8E3D3',
  fontSize: '0.9rem',
  lineHeight: '1.25',
  margin: 0,
  padding: 0,
  textAlign: 'left',
}),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#A8A29E',
    fontSize: '0.85rem',
    lineHeight: '1rem',
    textAlign: 'left',
  }),
  menu: (provided: any) => ({
    ...provided,
    background: '#242938',
    borderRadius: '0.5rem',
    marginTop: '0.1rem',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    zIndex: 10,
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: 0,
    maxHeight: '150px',
    overflowY: 'auto',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    background: state.isFocused
      ? 'rgba(0,208,255,0.2)'
      : state.isSelected
      ? '#00D0FF46'
      : '#242938',
    color: state.isSelected ? '#242938' : '#E8E3D3',
    cursor: 'pointer',
    padding: '0.25rem 1rem',       // más compacto
    fontSize: '0.85rem',
    lineHeight: '1rem',
    textAlign: 'left',
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    color: '#A8A29E',
    '&:hover': { color: '#E8E3D3' },
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: '#A8A29E',
    '&:hover': { color: '#E8E3D3' },
  }),
};
