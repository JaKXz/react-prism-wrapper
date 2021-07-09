import {Token} from 'prismjs';

import {tokenize} from './prism';

export interface NormalizedToken extends Partial<Token> {
  length: number;
  content: string;
  type: string;
  parent?: NormalizedToken;
}
export type NormalizedTokens = NormalizedToken[];

export default function normalizeTokens(
  tokenStream: ReturnType<typeof tokenize>,
  line = 0,
  acc: NormalizedTokens[] = [],
): NormalizedTokens[] {
  return tokenStream
    .reduce((tokenLines: NormalizedTokens[], collection: string | Token) => {
      if (!Array.isArray(tokenLines[line])) tokenLines[line] = [];

      if (typeof collection === 'string' && collection.includes('\n')) {
        // start a new row
        tokenLines[line].push({
          content: collection,
          length: collection.length,
          type: 'plain',
        });
        line += 1;
      } else if (typeof collection === 'object') {
        if (Array.isArray(collection.content)) {
          const {content, ...parent} = collection;
          const normalized = normalizeTokens(
            content.map((contents) =>
              typeof contents === 'string'
                ? contents
                : {
                    ...contents,
                    parent,
                  },
            ),
            line,
            tokenLines,
          );
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          tokenLines[line].push(normalized);
          line += normalized.length;
        } else {
          tokenLines[line].push(collection as NormalizedToken);
        }
      } else {
        tokenLines[line].push({
          content: collection,
          length: collection.length,
          type: 'plain',
        });
      }
      return tokenLines;
    }, acc)
    .filter(Boolean);
}
