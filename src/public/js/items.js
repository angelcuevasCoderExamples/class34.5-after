const addToCart = (cartId, itemId)=>{
    fetch(`/api/carts/${cartId}/item/${itemId}`,{
        method: "POST"
    }).then(res=>{
        if(res.status == 200){
            window.location.reload();
        }
    })
}

const purchaseCart = (cartId)=>{

    fetch(`/api/carts/${cartId}/purchase`,{
        method: "GET"
    }).then(res=>{
        if(res.status == 200){
            window.location.reload();
        }
    })
}

const deleteFromCart = (cartId,itemId)=>{

    fetch(`/api/carts/${cartId}/item/${itemId}`,{
        method: "DELETE"
    }).then(res=>{
        if(res.status == 200){
            window.location.reload();
        }
    })
}


