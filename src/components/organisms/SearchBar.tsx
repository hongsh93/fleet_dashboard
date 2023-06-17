import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from '@mui/material/MenuItem';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import debounce from 'lodash.debounce'

interface searchBarProps {
	setSearchStarred: Dispatch<SetStateAction<boolean>>
	setSearchString: Dispatch<SetStateAction<string>>
}

const SearchBar = ({ setSearchStarred, setSearchString }: searchBarProps) => {
	const [group, setGroup] = useState("All Locations")
	const handleGroupChange = (event: SelectChangeEvent<unknown>) => {
		const element = event.target as HTMLSelectElement
		setGroup(element.value)
		if (element.value === "starred") {
			setSearchStarred(true)
		} else {
			setSearchStarred(false)
		}
	}

	const debouncedSetSearchString = debounce(setSearchString, 500);

	const handleInputChange = (event: ChangeEvent) => {
		const element = event.target as HTMLInputElement
		debouncedSetSearchString(element.value)
	}
	return (
		<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
			<Select
				value={group}
				size="small"
				onChange={handleGroupChange}
			>
				<MenuItem value="All Locations">All Locations</MenuItem>
				<MenuItem value="starred"><StarOutlinedIcon style={{color: "#F7B500"}} fontSize="small" />starred</MenuItem>
			</Select>
			<FormControl variant="outlined">
				<InputLabel htmlFor="search-input" sx={{ fontSize: "12px"}}>Search robot or location</InputLabel>
          <OutlinedInput
            id="search-input"
						type="text"
						size="small"
						onChange={handleInputChange}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon fontSize="small"/>
              </InputAdornment>
            }
          />
        </FormControl>
		</div>
	)
}
export default SearchBar