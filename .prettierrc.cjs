// This is a Prettier configuration file
module.exports = {
  tabWidth: 2, // Number of spaces per indentation level
  useTabs: false, // Indent lines with spaces instead of tabs
  semi: true, // Print semicolons at the ends of statements
  singleQuote: true, // Use single quotes instead of double quotes
  htmlWhitespaceSensitivity: 'ignore', // Ignore whitespace sensitivity for HTML, reducing unnecessary line breaks
  printWidth: 80, // Wrap lines that exceed 80 characters
  trailingComma: 'none', // No trailing commas in objects or arrays
  bracketSpacing: true, // Print spaces between brackets in object literals
  arrowParens: 'always', // Always include parentheses around arrow function arguments
  cssEnable: ['css', 'scss'], // Enable Prettier for CSS, SCSS, etc.
  endOfLine: 'lf', // Use line feed only (LF) for newlines
  proseWrap: 'preserve', // Do not change wrapping in markdown files
  jsxSingleQuote: false // Use double quotes in JSX
};
