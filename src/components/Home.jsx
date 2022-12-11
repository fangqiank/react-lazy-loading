import {useState, lazy, Suspense, useTransition} from 'react'
// import { AdminData } from './AdminData'
// import {sum} from '../sum'
import { wait } from '../App'

const AdminData = lazy(() =>wait(1000)
	.then(() => import('./AdminData')
	.then(module => {
	return {default: module.AdminData}
})))

const Home = () => {
	const [isAdmin, setIsAdmin] = useState(false)
	const [isPending, startTransition] = useTransition()

	return (
		<>
			<h1>Home</h1>
			<button 
				onClick={() => {
					import('../sum.js').then(module => {
						alert(module.sum(3, 3))
					})
				}}
			>
				Add 3 + 3
			</button>
			<br />
			<br />
			<button 
				onClick={() => startTransition(() => {
					setIsAdmin(prev => !prev)
				})}
			>
				Toggle Admin
			</button>
			
			{isPending && "Start loading ..."}
			<Suspense fallback={<h2>Waiting...</h2>}>
				{isAdmin ? <AdminData /> : <h2>Not Admin</h2>}
			</Suspense>
		</>
	)
}

export default Home
