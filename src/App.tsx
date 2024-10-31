import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import { MyRoutes } from './routes/routes';

function App() {
  return (
    <AuthContextProvider>
      <MyRoutes />
    </AuthContextProvider>
  );
}

export default App;
