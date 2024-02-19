import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import { useTablePageContext } from '@context/TablePageContext';

export const SearchByIdInput = () => {
  const { filterId, handleFilterChange } = useTablePageContext();

  return (
    <Stack justifyContent="space-between">
      <FormControl sx={{ marginBottom: 3, height: 40 }}>
        <InputLabel htmlFor="component-outlined">Filter by ID</InputLabel>

        <OutlinedInput
          id="component-outlined"
          label="Filter item by ID"
          type="text"
          endAdornment={<SearchIcon sx={{ marginLeft: 2 }} />}
          value={filterId}
          onChange={handleFilterChange}
          color="info"
        />
      </FormControl>
    </Stack>
  );
};
