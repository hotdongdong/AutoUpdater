import { HashRouter } from "react-router-dom";

import { Router } from "./routes";

const App = () => {
  return (
    <HashRouter>
      <Router />
    </HashRouter>
  );
};

export default App;
