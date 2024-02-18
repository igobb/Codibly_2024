import React from 'react';
import { useRoutes } from 'react-router-dom';

const TablePage = React.lazy(() => import('@pages/TablePage/TablePage'));
const ErrorPage = React.lazy(() => import('@pages/ErrorPage/ErrorPage'));

const Routes = () => {
  return useRoutes([
    { path: '*', element: <ErrorPage /> },
    { path: '/', element: <TablePage /> },
  ]);
};

export default Routes;
