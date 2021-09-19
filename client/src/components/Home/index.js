import React from 'react'
import { Link } from 'react-router-dom'
import './home.scss'

const Home = () => {
	return (
		<div>
			<Link to='/user?id=6147b89b748b754a8d763a39'>
			<h1>home page</h1>
			</Link>
		</div>
	)
}

export default Home
