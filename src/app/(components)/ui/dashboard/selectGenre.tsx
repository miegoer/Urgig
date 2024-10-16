import { Autocomplete, TextField } from "@mui/material";
import { musicGenres } from "@/mockData/musicGenres";
import { useState } from "react";

interface SelectGenreProps {
  setGenres: (genres: string[]) => void;
  genres: string[];
}

const SelectGenre = ({ setGenres, genres }: SelectGenreProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  // Function to remove a selected genre
  const handleDelete = (genreToDelete: string) => {
    const updatedGenres = genres.filter((genre) => genre !== genreToDelete);
    setGenres(updatedGenres);
  };

  return (
    <div className="w-full">
      {/* Autocomplete for selecting genres */}
      <Autocomplete
        multiple
        freeSolo
        disableCloseOnSelect
        options={musicGenres}
        value={[]} // This ensures the selected genres are not shown in the input field
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue); // Control the search input value
        }}
        onChange={(event, newValue) => {
          const newGenres = newValue.filter((genre) => !genres.includes(genre));
          setGenres([...genres, ...newGenres]); // Append new genres
        }}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search genres..."
            variant="outlined"
            className="rounded-[20px] text-[black] text-center py-[5px] px-[10px] text-sm w-full" // Match the size of location search bar
            InputProps={{
              ...params.InputProps,
              className: "rounded-[20px] text-center py-[5px] px-[10px] text-sm", // Match styling of location input
              style: {
                backgroundColor: '#ffffff',
                borderRadius: '9999px',
                fontSize: '0.875rem', // Match the font size with your location search input
                height: '2.5rem', // Adjust height to match
              },
            }}
            InputLabelProps={{
              style: {
                color: '#73716F', // Light gray placeholder color
              },
            }}
          />
        )}
      />

      {/* Display the selected genres below the input */}
      <div className="p-3 mt-4">
        {genres.length > 0 ? (
          genres.map((genre) => (
            <span
              key={genre}
              className="z-10 flex flex-wrap inline-flex text-s bg-[black] text-[#ffa01e] rounded-[20px] py-1 px-3 mr-2.5 mb-2.5 tracking-[1px]"
            >
              {genre}
              <button
                onClick={() => handleDelete(genre)}
                className="ml-2 text-[#ffa01e] hover:text-red-500"
              >
                &#10005;
              </button>
            </span>
          ))
        ) : (
          <span className="text-xs italic">No genres added</span>
        )}
      </div>
    </div>
  );
};

export default SelectGenre;
