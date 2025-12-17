// ============================================
// UTILITY FUNCTIONS - CALCOLI FISCALI
// ============================================

const calcCoeff = (iva, rit, cassa) => (1 + cassa) * (1 + iva) - rit;
const lordoToImponibile = (lordo, coeff) => lordo / coeff;
const imponibileToLordo = (imponibile, coeff) => imponibile * coeff;

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '€ 0,00';
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount);
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('it-IT');
};

module.exports = {
  calcCoeff,
  lordoToImponibile,
  imponibileToLordo,
  formatCurrency,
  formatDate
};

