import Router from "./routes/Routes";
import { Provider } from 'react-redux';
import store from "./redux/store";


function App() {

  return (
    <Provider store={store}>
        <Router />
    </Provider>
    
  );
}



export default App;
