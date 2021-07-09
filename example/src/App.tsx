import {
  Highlight,
  ChildProps,
  NormalizedToken,
  NormalizedTokens,
} from 'react-prism-wrapper';

import code from './example-jsx-string';

const App = ({language = 'jsx'}) => {
  return (
    <Highlight code={code} language={language}>
      {({lines, getCodeProps, getLineProps, getTokenProps}: ChildProps) => (
        <pre>
          <code {...getCodeProps(language)}>
            {lines.map((tokens: NormalizedTokens, i: number) => (
              <div {...getLineProps(tokens, i)}>
                {tokens.map((token: NormalizedToken, key: number) => (
                  <span {...getTokenProps(token, key)} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
};

export default App;
