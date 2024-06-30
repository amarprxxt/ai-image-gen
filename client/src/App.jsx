import React from 'react'
import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import {logo} from './assets';
import { Home, CreatePost } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      {/* Tailwind Terms (do quick search on tailwind website): w-full : for full width, sm: on small devices  sm: px- padding horizontal py- padding for top&bottom */}
      <header className="w-full flex flex-col items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <h1 className="text-3xl font-bold mb-2"> AI Image Generator</h1>
        <div className="flex items-center space-x-2">
          <span>Powered by</span>
          <Link to="/">
            <img src={logo} alt="openai logo" className="w-28 object-contain" />
          </Link>
        </div>
      </header>
      <div className="flex justify-center mt-0 bg-[#f9fafe] py-4">
        <Link
          to="/"
          className="font-inter font-medium text-white px-6 py-2 rounded-md bg-[#000000] shadow-md mr-8 hover:no-underline focus:outline-none focus:ring-2 focus:ring-[#6469ff] focus:ring-opacity-50"
        >
          Home
        </Link>
        <Link
          to="/create-post"
          className="font-inter font-medium text-white px-6 py-2 rounded-md bg-[#000000] shadow-md hover:no-underline focus:outline-none focus:ring-2 focus:ring-[#6469ff] focus:ring-opacity-50"
        >
          Create
        </Link>
      </div>
    <main className="sm=p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/create-post" element={<CreatePost />}/> 
      </Routes>
    </main>
    </BrowserRouter>
  )
}

export default App