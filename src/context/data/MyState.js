import React, { useEffect, useState } from 'react'
import myContext from './myContext'
import { QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc,  getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDb } from '../../firebase/FirebaseConfig';

const MyState = (props) => {
    const [mode, setMode] = useState('light');
    const[loading,setLoading] = useState(false)



    const toggleMode = () => {
        if(mode === "light"){
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17,24,39)"
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = "white";
        }
    }
    const [products , setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )

    });

    const addProduct = async () =>{

        if(products.title=== null || products.price === null || products.imageUrl === null ||
             products.category === null || products.description === null){
                return toast.error('All fieds are required')

        }

        setLoading(true)
        try{
            const productRef = collection(fireDb,"products")

            await addDoc(productRef,products)
            toast.success("Add Product successfully")
           setTimeout (() =>{
            window.location.href = '/dashboard'
           },800);
            getProductData();
            setLoading(false);
            
        }
        catch(error){
            console.log(error)
            setLoading(false)
        }

        setProducts("");
    } 
    
    
    const [product , setProduct] = useState([])
     
    const getProductData = async () =>{

        setLoading(true);
        try {

            const q = query (
                collection(fireDb,'products'),
                orderBy('time')

            );
             const data = onSnapshot(q,(QuerySnapshot) =>{
                let productArray = [];
                QuerySnapshot.forEach((doc) =>{
                    productArray.push({...doc.data(), id:doc.id});
                });
                setProduct(productArray);
                setLoading(false);
             });
             return data;


        } catch (error){
            console.log(error);
            setLoading(false);
        }



    }  
     useEffect (()=>{
        getProductData();
        console.log( "getProductData",getProductData);

     },[]);


     // update product function


     const edithandle = (item) =>{
        setProducts(item);

     }
     // update product 

     const updateProduct = async (item) =>{
        setLoading(true);
        try{
            await setDoc(doc(fireDb,"products",products.id),products);
            toast.success("Product update successfully");
            getProductData();
            window.location.href ="/dashboard";
            setLoading(false);


        } catch(error){
            console.log(error);
            setLoading(false);

        }
        setProducts("");
     }

     //delete Products

     const deleteProduct = async (item) =>{
        setLoading(true)
        try{

            setLoading(true);
            await deleteDoc(doc(fireDb,"products",item.id));
            toast.success('Product delete Successfully');
            setLoading(false)
            getProductData();


        } catch (error){
            console.log(error)
            setLoading(false);


        }
     }


      // get Orders

  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDb, "order"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
      console.log(ordersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  // get users
  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDb, "users"))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false)
      });
      setUser(usersArray);
      console.log(usersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }



  useEffect (() =>{
    getOrderData();
    getUserData();


  },[])

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')

  





  return (
    <myContext.Provider value ={{mode,toggleMode,loading,setLoading,
        products,setProducts, addProduct,product,
        edithandle,updateProduct ,deleteProduct,order,user,
        searchkey,setSearchkey,filterType,setFilterType,filterPrice,setFilterPrice
    }} >
        {props.children}
    </myContext.Provider>
  )
}

export default MyState