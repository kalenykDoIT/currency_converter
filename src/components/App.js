import React from 'react';

import { Converter } from './Converter';
import { HistoricalRate } from './HistoricalRate';

export default function App() {

  return (
      <div className="App">
          <Converter/>
          <HistoricalRate/>
      </div>
  );
}