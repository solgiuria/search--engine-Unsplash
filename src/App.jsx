import React, {useEffect, useState} from 'react';
import './App.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import {motion} from 'framer-motion'

function App() {
  
  const[imagenes,setImagenes]=useState([])
  const[page,setPage]=useState(1)

  const[imagenesT,setImagenesT]=useState([])
  const[pageT,setPageT]=useState(1)

  const[imagenesR,setImagenesR]=useState([]) 
  const[pageR,setPageR]=useState(1)  //ACLARACION: hay tres page porq sino e ejecutan ambos scrolls ya q comparten una misma variable

  const[valor,setValor]=useState('') 
  const[valorTag,setValorTag]=useState('')


 // const[variable, setVariable]=useState(true)
  const[variable, setVariable]=useState(1)

  let apiKey='IpEk3fjnHgpVlE45mbuHsEq2S-egyTEIKo2_SNSqilM';   
  let apiKey2='1OdZ7w-YC7c7HXK0-7ZWjWVVqwj3b7TuL2xlfTV9XEo' 
  let apiKey3='bNwIkxB5q1FB2lhT-0wlPvW8RJjYtQkWR2aDwKHZwFE'
  let apiKey4='MHnRj--icS6lQO25gltrQlBAom7CT_VXq4mQNWf0op4'
  let apiKey5='68pFT5WPCEO0JvrkF8i8DYvbU4DV0dk3EsM98sbbIeA'
  let apiKey6='Ae-i-ljYW8AJU5VY82ejalfiDY95tdPrEqFoQaD2xew'


  //busqueda
  const fetchImgs= async ()=>{
      setVariable(1)
       let URL= `https://api.unsplash.com/search/photos/?client_id=${apiKey4}&query=${valor}&per_page=30`;   
      const response= await fetch(URL);
      const data= await response.json();
       setImagenes(data.results);
  }
 

  

  //scroll busqueda
  useEffect(()=>{
    if(!valor==''){ 
      const fetchImgs= async ()=>{
        let URL= `https://api.unsplash.com/search/photos/?client_id=${apiKey3}&query=${valor}&per_page=30&page=${page}`;           
        const response= await fetch(URL);
        const data= await response.json();
        setImagenes((datosPrev)=>datosPrev.concat(data.results));  
      }
        fetchImgs()
    }
  },[page]) 




  //random
  useEffect(()=>{
    if(valor==''){
        const fetchRandomImgs=async()=>{
          setVariable(2)
          let urlRandom=`https://api.unsplash.com/photos/random?count=30&client_id=${apiKey4}`;    
          const response= await fetch(urlRandom);
          const data= await response.json();
          setImagenesR((data));
        }
          fetchRandomImgs();
    }
    
  },[valor]) 


  //scroll random
  useEffect(()=>{
    if(valor=='' || valor==null){
      const fetchRandomImgs=async()=>{
        let urlRandom=`https://api.unsplash.com/photos/random?count=30&client_id=${apiKey4}&page=${page}`;
        const response= await fetch(urlRandom);
        const data= await response.json();
        setImagenesR((datosPrev)=>datosPrev.concat(data));
      }
        fetchRandomImgs();
    }
  },[pageR])



  //tags
  useEffect(()=>{
    if(!valor==''){
      const fetchTags= async ()=>{
        setVariable(3)
        let URL= `https://api.unsplash.com/search/photos/?client_id=${apiKey4}&query=${valorTag}&per_page=30`;   
        const response= await fetch(URL);
        const data= await response.json();
        setImagenesT(data.results); 
      }
        fetchTags();
    }
  },[valorTag]) 

  //tags scroll
  useEffect(()=>{
    //if(!valor==''){
      const fetchTags= async ()=>{ 
       let URL= `https://api.unsplash.com/search/photos/?client_id=${apiKey4}&query=${valorTag}&per_page=30&page=${pageT}`;   
       const response= await fetch(URL);
       const data= await response.json();
       setImagenesT((datosPrev)=>datosPrev.concat(data.results));
      }
    fetchTags();
   //}
  },[pageT]) 




  return (
<motion.div initial={{y:'-100px'}}
            transition={{type:'spring', stiffness:200}}
            animate={{y:'5px'}} 
            > 

      <div className='search-cont-cont'> 
        <div className='search-container'>
          <input type="text" 
          className='search-input' 
          placeholder='Buscar...' 
          onChange={e=>setValor(e.target.value)}/>

          <button className='search-btn' 
          onClick={()=>fetchImgs()}><i className="bi bi-search"></i></button>
        </div>
      </div>

  {    
     variable==1
       &&   
        <InfiniteScroll dataLength={imagenes.length} hasMore={true} next={()=>setPage(page+1)}>  
          <div className='main-container'>
              {
                imagenes.map((img, index)=>{ //esto del indice es porq cada vez q recorremos nos pide q cada elemento tenga su propia key, es decir, el id, o index.
                  return(
                    <div key={index} className='img-container'>
                      <img src={img.urls.regular} alt="" />
                        <div className='text-container'>
                            {
                              img.user.location 
                              ?
                              (
                                <p>Location: {img.user.location}</p>
                              )
                              :
                              (
                                <p>Location: Not found</p>
                              )
                            }

                            {
                              img.alt_description
                              ?
                              (
                                <p>Description: {img.alt_description}</p>
                              )
                              :
                              (
                                <p>Description: Not found</p>
                              )
                            }
                            <p>Camera: Not found</p>
                            <div className='cont-tags'>
                              {img.tags.map((tag,index)=><a className='tags' key={index} onClick={()=>{setValorTag(tag.title)}}>{tag.title}</a>)}
                            </div>  
                        </div>
                    </div>  
                  )
                  
                })
              }
          </div> 
        </InfiniteScroll> 
    }  

      


    {
      variable==2
      &&
        <InfiniteScroll dataLength={imagenesR.length} hasMore={true} next={()=>setPageR(pageR+1)}> 
          <div className='main-container'>
            {
              imagenesR.map((imgR, index)=>{ 
                return(
                  <div key={index} className='img-container-R'>
                    <img src={imgR.urls.regular} alt="" />
                    <div  className='text-container-R'>
                      {
                        imgR.user.location 
                        ?
                        (
                        <p>Location: {imgR.user.location}</p>
                        )
                        :
                        (
                        <p>Location: Not found</p>
                        )
                      }
                            
                      {
                        imgR.alt_description
                        ?
                        (
                        <p>Description: {imgR.alt_description}</p>
                        )
                        :
                        (
                        <p>Description: Not found</p>
                        )
                      }

                     {
                        imgR.exif.model
                        ?
                        (
                        <p>Camera: {imgR.exif.model}</p>
                        )
                        :
                        (
                        <p>Camera: Not found</p>
                        )
                      }
                      <p>Tags: Not found</p>
                    </div>
                  </div>  
                )           
              })
            } 
          </div> 
        
        </InfiniteScroll>
    }     

    {
      variable==3
      &&
        <InfiniteScroll dataLength={imagenesT.length} hasMore={true} next={()=>setPageT(pageT+1)}>  
          <div className='main-container'>
              {
                imagenesT.map((img, index)=>{ //esto del indice es porq cada vez q recorremos nos pide q cada elemento tenga su propia key, es decir, el id, o index.
                  return(
                    <div key={index} className='img-container'>
                      <img src={img.urls.regular} alt="" />
                        <div className='text-container'>
                            {
                              img.user.location 
                              ?
                              (
                                <p>Location: {img.user.location}</p>
                              )
                              :
                              (
                                <p>Location: Not found</p>
                              )
                            }

                            {
                              img.alt_description
                              ?
                              (
                                <p>Description: {img.alt_description}</p>
                              )
                              :
                              (
                                <p>Description: Not found</p>
                              )
                            }
                            <p>Camera: Not found</p>
                            <div className='cont-tags'>
                              {img.tags.map((tag,index)=><a className='tags' key={index} onClick={()=>{setValorTag(tag.title)}}>{tag.title}</a>)}
                            </div>  
                        </div>
                    </div>  
                  )
                  
                })
              }
          </div> 
        </InfiniteScroll>  
    }  
             
</motion.div>
    
  )


}

export default App
