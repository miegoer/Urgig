import { Autocomplete, TextField } from "@mui/material";
import { musicGenres } from "@/mockData/musicGenres";

interface SelectGenreProps {
  setGenres : (genres : string[])=> void,
  genres : string[]
}

const SelectGenre = ({setGenres,genres} : SelectGenreProps) => {

  return (
    <div>
      <Autocomplete
        multiple
        limitTags={5}
        value={genres}
        options={musicGenres}
        onChange={(e, newValue: string[]) => {
          e.preventDefault();
          setGenres(newValue);
        }}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField {...params} label="Select an option"  />
        )}
      />
    </div>
  );
};

export default SelectGenre;
