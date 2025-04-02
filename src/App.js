import Router from "./routes/Routes";
import { Provider } from 'react-redux';
import store from "./redux/store";

import AppProvider from "./contexts/App.context";


function App() {

  return (
    <Provider store={store}>
      <AppProvider>
        <Router />
      </AppProvider>
    </Provider>
    
  );
}



export default App;
