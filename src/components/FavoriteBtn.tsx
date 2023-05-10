import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const btnColor = createTheme({
  palette: {
    primary: {
      main: "#bfc66a",
    },
  },
});

export default function FavoriteBtn() {
  return (
    <ThemeProvider theme={btnColor}>
      <div>
        <Checkbox
          {...label}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
        />
      </div>
    </ThemeProvider>
  );
}
