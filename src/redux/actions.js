// import { GET_PRODUCT_DATA } from "./contsants";

// export const fetchProductAction = () => {
//     return async (dispatch) => {
//         try{
//             const response = await fetch('https://cloud.toddleapp.com/assets/mobile/hiring_material/ekart_data_26.json');
//             const data = await response.json();
//             dispatch({
//                 type: GET_PRODUCT_DATA,
//                 payload: data
//             })
//         }
//         catch(error){
//             console.log(error)
//         }
//     }
// }