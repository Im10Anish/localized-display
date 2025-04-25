# Localized Display

A lightweight JavaScript library to display numbers, dates, and currencies in a user's locale format without any dependencies.

## Features

- 🌐 Format numbers according to the user's locale
- 📅 Format dates according to the user's locale
- 💰 Format currencies according to the user's locale


## API Reference

### formatNumber(number, options)

Formats a number according to the user's locale.

#### Parameters:
- `number` (Number): The number to format
- `options` (Object, optional): Formatting options
  - `locale` (String, optional): Specific locale to use (e.g., 'fr-FR', 'de-DE'). Defaults to the user's browser locale.
  - `minimumFractionDigits` (Number, optional): Minimum number of fraction digits. Defaults to 0.
  - `maximumFractionDigits` (Number, optional): Maximum number of fraction digits. Defaults to 2.

#### Example:
```javascript
// Basic usage with browser locale
formatNumber(1234.56); // "1,234.56" (in en-US)

// With specific locale
formatNumber(1234.56, { locale: 'de-DE' }); // "1.234,56"

// With formatting options
formatNumber(1234.56789, { maximumFractionDigits: 3 }); // "1,234.568"
```

### formatDate(date, options)

Formats a date according to the user's locale.

#### Parameters:
- `date` (Date): The date to format
- `options` (Object, optional): Formatting options
  - `locale` (String, optional): Specific locale to use. Defaults to the user's browser locale.
  - `dateStyle` (String, optional): One of 'full', 'long', 'medium', or 'short'. Defaults to 'medium'.
  - `timeStyle` (String, optional): One of 'full', 'long', 'medium', or 'short'. No default.

#### Example:
```javascript
// Basic usage with browser locale
formatDate(new Date()); // "Apr 26, 2025" (in en-US)

// With specific locale
formatDate(new Date(), { locale: 'fr-FR' }); // "26 avr. 2025"

// With date and time style
formatDate(new Date(), { dateStyle: 'full', timeStyle: 'short' }); 
// "Saturday, April 26, 2025 at 3:15 PM" (in en-US)
```

### formatCurrency(amount, currency, options)

Formats a monetary amount according to the user's locale.

#### Parameters:
- `amount` (Number): The amount to format
- `currency` (String): Currency code (e.g., 'USD', 'EUR', 'JPY')
- `options` (Object, optional): Formatting options
  - `locale` (String, optional): Specific locale to use. Defaults to the user's browser locale.
  - `minimumFractionDigits` (Number, optional): Minimum number of fraction digits. Defaults to currency standard.
  - `maximumFractionDigits` (Number, optional): Maximum number of fraction digits. Defaults to currency standard.

#### Example:
```javascript
// Basic usage with browser locale
formatCurrency(1234.56, 'USD'); // "$1,234.56" (in en-US)

// With specific locale
formatCurrency(1234.56, 'EUR', { locale: 'de-DE' }); // "1.234,56 €"

// With formatting options
formatCurrency(1234.5, 'JPY', { maximumFractionDigits: 0 }); // "¥1,235"
```

