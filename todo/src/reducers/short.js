export default (state=[],action) =>{
    switch(action.type){
        case 'SHORT':
            return action.payload;
            default:
                return state; }
    }