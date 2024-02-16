import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ErrorBoundary } from '@components/ErrorBoundary';
import { TablePage } from '@pages/TablePage';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <TablePage />
      </div>
    </ErrorBoundary>
  );
}

export default App;
