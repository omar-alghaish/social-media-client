import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const themeModes = {
  dark: "dark",
  light: "light",
};

const themeConfigs = {
  custom: ({ mode }) => {
    const customPalette =
      mode === themeModes.dark
        ? {
            primary: {
              main: "#32CD32",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#00FF00",
              contrastText: "#ffffff",
            },
            background: {
              paper: "#161717",
              default: "#000000",
              loading1:"#696969",
              loading2:"#808080",
            },
          }
        : {
            primary: {
              main: "#32CD32",
              contrastText: "#ffffff",

            },
            secondary: {
              main: "#00FF00",
              contrastText: "#ffffff",

            },
            background: {
              paper:colors.grey["100"],
              default:   "#ffffff",
            },
          };

    return createTheme({
      palette: {
        mode,
        ...customPalette,
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              "& .MuiFilledInput-root": {
                backgroundColor: "", 
              },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "", 
                },
                "&.Mui-focused fieldset": {
                  borderColor: "",
                },
              },
            },
          },
        },
      },
    });
  },
};

export default themeConfigs;
