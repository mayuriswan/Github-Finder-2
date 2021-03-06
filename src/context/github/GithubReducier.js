const githubReducer =(state,action)=>{
    switch(action.type){
        case 'CLEAR':
            return{
                ...state,
                users:action.payload,
                loading:false

            }
        case 'GET_USER':
            return{
                ...state,
                user:action.payload,
                loading:false
            }
        case 'GET_USER_REPO':
            return{
                ...state,
                repos:action.payload,
                loading:false
            }
        case 'GET_USERS':
            return {
                ...state,
                users:action.payload,
                loading: false,
            }
        case 'SET_LOADING':
            return{
                ...state,
                loading:true
            }
        default:
            return state
    }
}
export default githubReducer