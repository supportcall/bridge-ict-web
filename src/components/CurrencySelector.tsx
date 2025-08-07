import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type Currency = 'USD' | 'AUD' | 'ZAR';

interface CurrencySelectorProps {
  onCurrencyChange: (currency: Currency) => void;
  selectedCurrency: Currency;
}

const CurrencySelector = ({ onCurrencyChange, selectedCurrency }: CurrencySelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Currency:</span>
      <Select value={selectedCurrency} onValueChange={(value: Currency) => onCurrencyChange(value)}>
        <SelectTrigger className="w-24 bg-card border-border text-foreground">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-card border-border z-50">
          <SelectItem value="USD">USD</SelectItem>
          <SelectItem value="AUD">AUD</SelectItem>
          <SelectItem value="ZAR">ZAR</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export const useCurrencyPricing = () => {
  const [currency, setCurrency] = useState<Currency>('USD');

  const formatPrice = (usdPrice: number): string => {
    const rates = {
      USD: { symbol: '$', rate: 0.7 }, // USD converted from AUD base
      AUD: { symbol: 'A$', rate: 1 },   // AUD as base rate
      ZAR: { symbol: 'R', rate: 5.5 }   // ZAR rate relative to AUD
    };

    const convertedPrice = Math.round(usdPrice * rates[currency].rate);
    return `${rates[currency].symbol}${convertedPrice}`;
  };

  const getHourlyRate = (): { min: string; max: string } => {
    const rates = {
      USD: { min: 25, max: 180, symbol: '$' }, // Converted from AUD rates
      AUD: { min: 35, max: 250, symbol: 'A$' },
      ZAR: { min: 400, max: 1500, symbol: 'R' }
    };

    return {
      min: `${rates[currency].symbol}${rates[currency].min}`,
      max: `${rates[currency].symbol}${rates[currency].max}`
    };
  };

  return {
    currency,
    setCurrency,
    formatPrice,
    getHourlyRate
  };
};

export default CurrencySelector;