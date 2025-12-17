// ============================================
// UTILITY FUNCTIONS - CALCOLI FISCALI
// ============================================

export const calcCoeff = (iva, rit, cassa) => (1 + cassa) * (1 + iva) - rit;
export const lordoToImponibile = (lordo, coeff) => lordo / coeff;
export const imponibileToLordo = (imponibile, coeff) => imponibile * coeff;

export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '€ 0,00';
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount);
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('it-IT');
};

