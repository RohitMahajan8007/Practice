import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import { Route } from './App.routes.jsx'
import { store } from './app.store.js'
import './App.css'

function App() {

  return (
   <Provider store={store}>
     <RouterProvider router={Route} />
   </Provider>

   
  )
}

export default App
