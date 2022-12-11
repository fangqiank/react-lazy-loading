import { lazy, Suspense } from 'react'
import { Routes, Route, Link, Outlet} from 'react-router-dom'
import { lazyLoad } from './lazyLoad'
// import { About } from './components/About'
// import Home from './components/Home'
// import Store from './components/Store'

const Home = lazy(() => wait(1000).then(() => import('./components/Home'))) 
const Store = lazy(() => wait(1000).then(() => import('./components/Store')))
const About = lazyLoad('./components/About', 'About')

const NavWrapper = () => {
  return(
    <>
      <nav style={{display: 'flex', gap:'1rem'}}>
        <Link to='/' >Home</Link>
        <Link to='/store' >Store</Link>
        <Link to='/about'>About</Link>
      </nav>

      <Suspense fallback={<strong>Loading...</strong>}>
       <Outlet />
      </Suspense>
  </>
  )
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<NavWrapper />} >
        <Route path='/' element={<Home />} />
        <Route path='/store' element={<Store />} />
        <Route path='/about' element={<About />} />
      </Route>
    </Routes>
  )
}

export const wait = (time) => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

export default App
