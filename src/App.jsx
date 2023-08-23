import { useState } from 'react'
import './component/ImageUploadcss.css'


import ImageUpload from './component/ImageUpload'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <ImageUpload/>
    </>
  )
}

export default App
