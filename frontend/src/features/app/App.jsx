import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import { Route } from './App.routes.jsx'
import { store } from './app.store.js'
import { AuthCheck } from '../auth/Components/Protected.jsx'
import './App.css'

function App() {

  return (
   <Provider store={store}>
     <AuthCheck>
       <RouterProvider router={Route} />
     </AuthCheck>
   </Provider>

   
  )
}

export default App
