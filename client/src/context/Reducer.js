const Reducer = (state,action) => {
    switch(action.type){
        case "LOGIN_START":
            return{
               user:null,
               isFetching:true, 
               error:false
            };
            case "LOGIN_SUCCESS":
            return{
               user:action.payload,
               isFetching:false, 
               error:false
            };
            case "LOGIN_FAILURE":
            return{
               user:null,
               isFetching:true, 
               error:true,
            };
            case "UPDATE_START":
               return{
                  ...state , //birşey değişmeyecek diye state kukkandık
                  isFetching:true
               };
               case "UPDATE_SUCCESS":
               return{
                  user:action.payload,
                  isFetching:false, 
                  error:false
               };
               case "UPDATE_FAILURE":
               return{
                  user:state.user, //user değişmeyecek diye state kullandık
                  isFetching:true, 
                  error:true,
               };
            case "LOGOUT":
               return{
                  user:null,
                  isFetching:false, 
                  error:false,
               };
            default:
                return state;
    }
};

export default Reducer;