import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type Currency = 'USD' | 'AUD' | 'ZAR' | 'GBP';

interface CurrencySelectorProps {
  onCurrencyChange: (currency: Currency) => void;
  selectedCurrency: Currency;
}

const CurrencySelector = ({ onCurrencyChange, selectedCurrency }: CurrencySelectorProps) => {
  return (
    <div className="currency-selector flex items-center gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20 shadow-sm">
      <span className="text-sm font-medium text-foreground">Select Currency:</span>
      <Select value={selectedCurrency} onValueChange={(value: Currency) => onCurrencyChange(value)}>
        <SelectTrigger className="w-28 bg-background border-primary/30 text-foreground shadow-sm hover:border-primary/50 transition-colors">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border shadow-lg z-50">
          <SelectItem value="USD" className="hover:bg-accent hover:text-accent-foreground">USD ($)</SelectItem>
          <SelectItem value="AUD" className="hover:bg-accent hover:text-accent-foreground">AUD (A$)</SelectItem>
          <SelectItem value="GBP" className="hover:bg-accent hover:text-accent-foreground">GBP (£)</SelectItem>
          <SelectItem value="ZAR" className="hover:bg-accent hover:text-accent-foreground">ZAR (R)</SelectItem>
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
      GBP: { symbol: '£', rate: 0.55 }, // GBP rate relative to AUD
      ZAR: { symbol: 'R', rate: 5.5 }   // ZAR rate relative to AUD
    };

    const convertedPrice = Math.round(usdPrice * rates[currency].rate);
    return `${rates[currency].symbol}${convertedPrice}`;
  };

  const getHourlyRate = (): { min: string; max: string } => {
    const rates = {
      USD: { min: 25, max: 180, symbol: '$' }, // Converted from AUD rates
      AUD: { min: 35, max: 250, symbol: 'A$' },
      GBP: { min: 18, max: 130, symbol: '£' },
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