import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ErrorBoundary } from '@components/ErrorBoundary';
import Routes from './routes/Routes';
import { Suspense } from 'react';
import { Loader } from '@components/Loader';
import { Box, Container, Paper, Stack } from '@mui/material';
import { TablePageProvider } from './context';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Suspense fallback={<Loader />}>
          <Container maxWidth="sm">
            <Stack sx={{ height: '100%', justifyContent: 'center' }}>
              <Paper elevation={20}>
                <Box
                  sx={{
                    margin: 2,
                    padding: 5,
                    paddingBottom: 2,
                    minHeight: 555,
                  }}
                >
                  <TablePageProvider>
                    <Routes />
                  </TablePageProvider>
                </Box>
              </Paper>
            </Stack>
          </Container>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
