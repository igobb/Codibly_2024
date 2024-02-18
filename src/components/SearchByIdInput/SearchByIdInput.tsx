import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';

interface SearchByIdInputProps {
  filterId: string;
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchByIdInput = ({
  filterId,
  handleFilterChange,
}: SearchByIdInputProps) => {
  return (
    <Stack justifyContent="space-between">
      <FormControl sx={{ marginBottom: 3, height: 40 }}>
        <InputLabel htmlFor="component-outlined">Filter by ID</InputLabel>

        <OutlinedInput
          id="component-outlined"
          label="Filter by ID"
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
