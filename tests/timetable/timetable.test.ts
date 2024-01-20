

import { darkThemeColors, getCurrentColorScheme, lightThemeColors } from '$lib/colors';  // Import the function to test

test('getCurrentColorScheme returns correct colors for light theme', () => {
  const theme = 'light';
  const colors = getCurrentColorScheme(theme);
  expect(colors).toEqual(lightThemeColors);  // Replace with expected light theme colors
});

test('getCurrentColorScheme returns correct colors for dark theme', () => {
  const theme = 'dark';
  const colors = getCurrentColorScheme(theme);
  expect(colors).toEqual(darkThemeColors);  // Replace with expected dark theme colors
});

test('getCurrentColorScheme returns correct colors for auto theme', () => {
  const theme = 'auto';
  // Mock window.matchMedia to simulate dark mode
  window.matchMedia = jest.fn().mockReturnValue({ matches: true });
  const colors = getCurrentColorScheme(theme);
  expect(colors).toEqual(darkThemeColors);  // Replace with expected default theme colors in dark mode
});