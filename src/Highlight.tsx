import {ReactElement} from 'react';
import normalizeTokens, {
  NormalizedToken,
  NormalizedTokens,
} from './normalizeTokens';
import {tokenize} from './prism';
import {ChildProps, LineProps, TagProps, TokenProps} from './';

export interface HighlightProps {
  code: string;
  language: string;
  children: ({
    getCodeProps,
    getLineProps,
    getTokenProps,
    lines,
  }: ChildProps) => ReactElement;
}

export function Highlight({
  code,
  language,
  children,
}: HighlightProps): ReactElement {
  const lines = normalizeTokens(tokenize(code, language));

  return children({getCodeProps, getLineProps, getTokenProps, lines});
}

function getCodeProps(lang: string): TagProps {
  return {
    className: `prism-code language-${lang}`,
  };
}

function getLineProps(_tokens: NormalizedTokens, i: number): LineProps {
  return {
    key: `line${i + 1}`,
    className: 'token-line',
  };
}

function getTokenProps(token: NormalizedToken, key: number): TokenProps {
  return {
    key: `${key}-${token.type}`,
    className: getTokenClassName(token.parent ? token.parent : token),
    children: token.parent ? (
      <span className={getTokenClassName(token)}>{token.content}</span>
    ) : (
      token.content
    ),
  };
}

function getTokenClassName(token: NormalizedToken): string {
  return [
    'token',
    token.type,
    token.alias,
    token.type === 'keyword' && `keyword-${token.content}`,
  ]
    .flat()
    .filter(Boolean)
    .join(' ');
}
