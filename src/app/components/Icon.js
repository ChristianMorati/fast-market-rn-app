import React from 'react';
import { AntDesign } from '@expo/vector-icons'; // Importando o conjunto de ícones AntDesign

export const Icon = ({ name, size, color, style }) => {
  return (
    <AntDesign
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
};