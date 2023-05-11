import { MenuItem, Select } from "@mui/material";

export const SelectFilter = ({ selectValue, handleChange, itemList }) => {
  return (
    <Select fullWidth value={selectValue} onChange={handleChange}>
      {itemList.map((item, index) => {
        return (
          <MenuItem value={item} key={index}>
            {item}
          </MenuItem>
        );
      })}
    </Select>
  );
};
