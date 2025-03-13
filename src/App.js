import Router from "./routes/Routes";
import AppProvider from "./contexts/App.context";

function App() {

  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}



export default App;
