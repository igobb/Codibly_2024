import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Fragment } from 'react';
import { AxiosError } from 'axios';

interface ErrorViewProps {
  error: AxiosError;
  filterId: string;
}

export const ErrorView = ({ error, filterId }: ErrorViewProps) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ marginTop: 3, padding: 5, height: 270 }}
    >
      <Typography align="center" variant="subtitle1" gutterBottom>
        {error?.response?.status === 404 && (
          <Fragment>
            There is no product with ID
            <Typography sx={{ fontSize: '25px' }}>{filterId}</Typography>
            in the database
          </Fragment>
        )}

        {error?.response?.status !== 404 && <>An error has occurred</>}
      </Typography>

      <br />

      <Typography align="center" variant="subtitle2" gutterBottom>
        Status: {error?.response?.status}
      </Typography>
    </Stack>
  );
};
