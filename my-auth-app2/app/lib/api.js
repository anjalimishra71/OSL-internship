export async function apiRequest(url,options={}){
    const response=await fetch(url,options);
    const data=await response.json();

    if(!response.ok){
         throw new Error(data.message||"something went wrong");
    }
    return data;
}