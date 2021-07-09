import {Key, ReactNode} from 'react';
import {NormalizedToken, NormalizedTokens} from './normalizeTokens';

export type {NormalizedToken, NormalizedTokens};

export interface TagProps {
  className: string;
}

export interface LineProps extends TagProps {
  key: Key;
}

export interface TokenProps extends LineProps {
  children: ReactNode;
}

export interface ChildProps {
  getCodeProps: (lang: string) => TagProps;
  getLineProps: (tokens: NormalizedTokens, i: number) => LineProps;
  getTokenProps: (token: NormalizedToken, key: number) => TokenProps;
  lines: NormalizedTokens[];
}

export * from './Highlight';
