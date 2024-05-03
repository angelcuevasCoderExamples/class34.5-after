const socket = io();

const itemDescription = document.getElementById('itemDescription');
const createItemButton = document.getElementById('createItemButton');
const tbodyId = document.getElementById("tbodyId")
const myForm = document.getElementById("myForm")

createItemButton.addEventListener('click',()=>{
    socket.emit('new item',{description: itemDescription.value })
    itemDescription.value = ""
})

//socket server events:
socket.on('list updated',({items})=>{
    tbodyId.innerHTML = ""
    items.forEach(item => {
        tbodyId.innerHTML+=`<tr>
            <td>${item._id}</td>
            <td>${item.description}</td>
            <td>stock ${item.stock}</td>
            <td>price ${item.price}</td>
            <td><button onclick="deleteItem('${item._id}')">delete</button></td>
        </tr>`
    });
})


function deleteItem(id){
    socket.emit('delete item',{id: id})
}

myForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const formData = new FormData(myForm);
    const payload = {}
    formData.forEach((value, key)=>payload[key] = value)

    fetch('/api/items',{
        method:'POST',
        body: JSON.stringify(payload),
        headers:{
            'Content-type': 'application/json'
        }
    }).then((res)=>{
        if(res.status == 200){
            window.location.reload();
        }
    })

})