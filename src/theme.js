const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 18,
  },
  fonts: {
    main: "System",
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export const buttonStyle = {
  backgroundColor: theme.colors.primary,
  color: "white",
  fontSize: theme.fontSizes.subheading,
  display: "flex",
  margin: 10,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: theme.colors.primary,
  overflow: "hidden",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  padding: 10,
};

export const buttonDisabledStyle = {
  backgroundColor: theme.colors.textSecondary,
};

export default theme;
