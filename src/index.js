import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query'
import { TeamsDataProvider, WeeksDataProvider } from './utils/context';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WeeksDataProvider>
        <TeamsDataProvider>
            <App />
        </TeamsDataProvider>
      </WeeksDataProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);