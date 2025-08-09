import {Header}  from './components/Header'
import { Search } from './components/Search'
import './App.css'

function App() {

  return (
    <>
      <Header />
      <section className="countries__container">
          <Search  />
      </section>
    </>
  )
}

export default App
