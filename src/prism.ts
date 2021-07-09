import Prism from 'prismjs';

export function tokenize(
  code: string,
  language: string,
): ReturnType<typeof Prism.tokenize> {
  const env: Prism.hooks.TokenizeEnvironment = {
    code,
    language,
    grammar: Prism.languages[language],
    tokens: [],
  };

  Prism.hooks.run('before-tokenize', env);
  env.tokens = Prism.tokenize(env.code, env.grammar);
  Prism.hooks.run('after-tokenize', env);

  return env.tokens;
}
