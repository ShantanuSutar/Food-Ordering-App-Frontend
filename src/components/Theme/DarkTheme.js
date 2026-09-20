import { alpha, createTheme } from '@mui/material/styles'

export const designTokens = {
  primary: '#F97316',
  primaryDark: '#EA580C',
  accent: '#FBBF24',
  background: '#111827',
  surface: '#1F2937',
  surfaceSecondary: '#273449',
  text: '#F9FAFB',
  muted: '#9CA3AF',
  success: '#22C55E',
  error: '#EF4444',
  border: 'rgba(148, 163, 184, 0.18)',
}

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: designTokens.primary, dark: designTokens.primaryDark, contrastText: '#111827' },
    secondary: { main: designTokens.accent, contrastText: '#111827' },
    success: { main: designTokens.success },
    error: { main: designTokens.error },
    background: { default: designTokens.background, paper: designTokens.surface },
    text: { primary: designTokens.text, secondary: designTokens.muted },
    divider: designTokens.border,
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    button: { textTransform: 'none', fontWeight: 700, letterSpacing: 0 },
    h1: { fontWeight: 750 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
  },
  components: {
    MuiCssBaseline: { styleOverrides: { body: { backgroundColor: designTokens.background, color: designTokens.text } } },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: `1px solid ${designTokens.border}`,
          boxShadow: '0 12px 32px rgba(2, 6, 23, 0.18)',
        },
      },
    },
    MuiCard: { styleOverrides: { root: { backgroundColor: designTokens.surface } } },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { minHeight: 42, borderRadius: 9, paddingInline: 18 },
        containedPrimary: { color: '#111827', '&:hover': { backgroundColor: designTokens.primaryDark } },
        outlined: { borderColor: alpha('#94A3B8', 0.35) },
      },
    },
    MuiIconButton: {
      styleOverrides: { root: { '&:focus-visible': { outline: `3px solid ${alpha(designTokens.primary, 0.35)}` } } },
    },
    MuiTextField: { defaultProps: { size: 'medium' } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          minHeight: 48,
          backgroundColor: alpha(designTokens.surfaceSecondary, 0.52),
          '& fieldset': { borderColor: alpha('#94A3B8', 0.25) },
          '&:hover fieldset': { borderColor: alpha('#94A3B8', 0.48) },
          '&.Mui-focused fieldset': { borderWidth: 2 },
        },
      },
    },
    MuiDialog: { styleOverrides: { paper: { borderRadius: 14, backgroundColor: designTokens.surface } } },
    MuiDrawer: { styleOverrides: { paper: { backgroundColor: '#172033', backgroundImage: 'none' } } },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottomColor: designTokens.border },
        head: { color: '#CBD5E1', fontWeight: 700, backgroundColor: alpha(designTokens.surfaceSecondary, 0.55) },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 650 } } },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: designTokens.surface,
          border: `1px solid ${designTokens.border}`,
          boxShadow: 'none',
          overflow: 'hidden',
          '&:before': { display: 'none' },
          '&.Mui-expanded': { margin: 0 },
        },
      },
    },
    MuiSkeleton: {
      defaultProps: { animation: 'wave' },
      styleOverrides: { root: { backgroundColor: alpha('#94A3B8', 0.12) } },
    },
  },
})
