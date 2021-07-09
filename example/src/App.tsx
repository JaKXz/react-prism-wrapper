import {ExampleComponent} from 'react-prism-wrapper';

import code from './example-jsx-string';

const App = () => {
  return <ExampleComponent language={'jsx'} code={code} />;
};

export default App;
