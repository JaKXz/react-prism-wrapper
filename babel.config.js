const LANGUAGES = [
  'js-templates',
  'markup-templating',
  'liquid',
  'ruby',
  'yaml',
  'graphql',
  'json',
  'markdown',
  'bash',
  'jsx',
  'typescript',
  'tsx',
  'sql',
];

module.exports = {
  plugins: [
    [
      'prismjs',
      {
        languages: LANGUAGES,
      },
    ],
  ],
};
