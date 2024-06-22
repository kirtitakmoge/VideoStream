
import { AuthProvider } from './components/AuthContext';
import { DepartmentProvider } from './components/DepartmentContext';
import HospitalAccessProvider from './components/HospitalAccessProvider';
import NewApp from './components/NewApp';
import 'tailwindcss/tailwind.css'
import { Toaster } from 'react-hot-toast';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../src/redux/store/store';


function App() {
  return (
   <><div className='App'> 
  <AuthProvider>
    <HospitalAccessProvider>
      <DepartmentProvider>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <NewApp/>
      </PersistGate>
    </Provider>
     
     <Toaster />
     </DepartmentProvider>
     </HospitalAccessProvider>
     </AuthProvider>
     </div> 
   </>
  );
}

export default App;
