
import { AuthProvider } from './components/AuthContext';
import { DepartmentProvider } from './components/DepartmentContext';
import HospitalAccessProvider from './components/HospitalAccessProvider';
import NewApp from './components/NewApp';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
   <><div className='App'> 
  <AuthProvider>
    <HospitalAccessProvider>
      <DepartmentProvider>
     <NewApp/>
     <Toaster />
     </DepartmentProvider>
     </HospitalAccessProvider>
     </AuthProvider>
     </div> 
   </>
  );
}

export default App;
