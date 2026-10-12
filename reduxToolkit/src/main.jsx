import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)


/*

////////////////////////////////

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
  </Provider>
)

export const store=configureStore({
      reducer:{         
      counter:counterReducer,
      user:userReducer
      }
})


export const counterSlice=createSlice({
  name:'counter',
  initialState:{
    value:0
  },
  reducers:{
     increment:(state)=>{
       state.value +=1;
      },

      decrement:(state)=>{
       state.value -=1  
      },
  
      reset:(state)=>{
        state.value=0;
      },

      incrementBy:(state,action)=>{
          state.value +=action.payload;    
      }
      
  }
})

export const {increment,decrement,reset,incrementBy}=counterSlice.actions
export default counterSlice.reducer;


export const userSlice=createSlice({
  name:'user',
  
  initialState:{
    name:"anjali",
    isLoggedIn:false
  },

   reducers:{
      login:(state)=>{
        state.isLoggedIn=true;
      },

      logout:(state)=>{
        state.isLoggedIn=false;  
      }
   
   }
})

export const {login,logout}=userSlice.actions
export default userSlice.reducer;




const App=()=>{
  const dispatch=useDispatch();
  const counter=useSelector(state=>state.counter.value)

  const userName=useSelector(state=>state.user.name)
  const userStatus=useSelector(state=>state.user.isLoggedIn)

   const [amount, setAmount] = useState("");

  return(
  <>
    <h1>{counter}</h1>
     <button onClick={()=>dispatch(increment())}>+</button>
     <button onClick={()=>dispatch(decrement())}>-</button>
     <button onClick={()=>dispatch(reset())}>Reset</button>
     <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
     <button onClick={()=>dispatch(incrementBy(Number(amount)))}>Increment By</button>


     <h2>{userName} , {userStatus?"Logged in":"logged out"}</h2>
     <button onClick={()=>dispatch(login())}>Login</button>
     <button onClick={()=>dispatch(logout())}>Logout</button>


     </>
  )
  }


*/