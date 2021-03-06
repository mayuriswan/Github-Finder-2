import {  createContext ,useState ,useReducer} from "react";
import githubReducer from "./GithubReducier";

const GithubContext = createContext()

export	const GithubProvider = ({children})=>{
    const intialState =(
        {
            users:[],
            user:{},
            repos:[],
            loading:false
        }
    )
    const [state,dispatch]=useReducer(githubReducer,intialState)
    // const fetchUser = async ()=>{
    //     setLoading()
    //     const response = await fetch(`https://api.github.com/users`)
    //     const data =await response.json()
    //    dispatch({
    //        type:'GET_USERS',
    //        payload : data,
    //    })

        

    // }
    const clear = ()=>{
        dispatch(
            {
                type:'CLEAR',
                payload:[]
            }
        )
    }
    const searchUser = async (text)=>{
        setLoading()
        const param = new URLSearchParams({
            q:text,
        })
        const response = await fetch(`https://api.github.com/search/users?${param}`)
        const {items} = await response.json()
        dispatch({
                   type:'GET_USERS',
                   payload : items,
               })
    }
    const findhUser = async (login)=>{
        setLoading()
      
        const response = await fetch(`https://api.github.com/users/${login}`)
        
        if(response.status===404){
            window.location='/notfound'
            console.log('hello')
        }else{
            const item = await response.json()
            dispatch({
                type:'GET_USER',
                payload:item
            })
        }
    }
    const getUserRepo = async (login)=>{
        setLoading()
      
        const response = await fetch(`https://api.github.com/users/${login}/repos`)
        
        if(response.status===404){
            window.location='/notfound'
            console.log('hello')
        }else{
            
            const item = await response.json()
            console.log(item)
            dispatch({
                type:'GET_USER_REPO',
                payload:item
            })
           
        }
    }
    const setLoading =()=>{
        dispatch({
            type:'SET_LOADING'
        })
    }
    return <GithubContext.Provider value={{
        users:state.users,
        loading:state.loading,
        searchUser,
        clear,
        user:state.user,
        getUserRepo,
        repos:state.repos,
        findhUser
       
    }}>
        {children}
    </GithubContext.Provider>
    
}
export default GithubContext