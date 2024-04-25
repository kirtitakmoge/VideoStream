
import { AuthProvider } from './components/AuthContext';
import NewApp from './components/NewApp';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
   <><div className='App'> 
  <AuthProvider>
     <NewApp/>
     <Toaster />
     
     </AuthProvider>
     </div> 
   </>
  );
}

export default App;
