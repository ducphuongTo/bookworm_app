import React,{useEffect} from 'react'
import Feature from '../../Components/base/Home/Feature'
import OnSale from '../../Components/base/Home/OnSale'



function Home() {

  return (
    <>
      <div className='container'>
        <OnSale/>
        <Feature/>
      </div>
    </>
    
  )
}

export default Home


