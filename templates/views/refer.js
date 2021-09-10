sum=0
perc=0
arr=["nutrify"]
calorietotal=[]

function setcalorie(){ 
    x=document.getElementById("totalcalories").value
    x=parseInt(x)
    calorietotal.splice(0,0,x)
    alert(`total calories count is set to ${x}`)
}
console.log(calorietotal);



function additoff (){
    x = document.getElementById("recipientname").value;
    y = document.getElementById("messagetext").value;
    z = document.getElementById("recipientcalories").value;
    
    z1=parseInt(z)
    sum=sum+z1
    perc= perc+((z/calorietotal[0])*100)
    document.getElementById("progressor").innerHTML= `<div class="progress-bar" role="progressbar" style="width: ${perc}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${perc}%</div>`
    document.getElementById("calcount").innerHTML=`${sum}/${calorietotal[0]}`
    document.getElementById("cardadder").innerHTML += `
    <div class="card text-white  mb-3" id="${x}" style="max-width: 29rem;margin:30px 30%; padding:20px text-align:center; background:-webkit-linear-gradient(left, #3931af, #00c6ff">
    <div class="card-header">Meal Name: ${x}</div>
    <div class="card-header" id="${z}" >Calories: ${z}</div>
    <div class="card-body">
    <p class="card-text">Description: ${y}</p>
    
    <button type="button" class="btn btn-light" id="delete" data-value="${x}" onclick="poptoedit()" data-bs-dismiss="modal" style="margin:0px 5px">Edit Meal</button>
    <button type="button" class="btn btn-light" id="delete" data-value="${x}" onclick="deleteitoff(this),dropoff(${z})" data-bs-dismiss="modal">Delete Meal</button>

    </div>
    `
    
            arr.push(x)
    console.log(arr);
}


function deleteitoff(value){
    var assigned= value.getAttribute("data-value")
    //console.log(assigned);
    var comparer = document.getElementById(`${assigned}`)
    //console.log(comparer);
    
    var comparerid = document.getElementById(`${assigned}`).id
    //console.log(comparer.id);
    
    if (assigned == comparerid) {
        
               
        comparer.remove()
        
    }
    
}

function dropoff(value){
    var ten = value
    //console.log(ten);
    sum=sum-ten
    //console.log(sum);
    perc=((sum/calorietotal[0])*100)
    //console.log(perc);
    document.getElementById("calcount").innerHTML=`${sum}/${calorietotal[0]}`
    document.getElementById("progressor").innerHTML= `<div class="progress-bar" role="progressbar" style="width: ${perc}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${perc}%</div>`
    if(document.getElementById("updater")){
        document.getElementById("updater").remove()
    }
}

function poptoedit(){
    console.log("yes");
    document.getElementById("editor").innerHTML =`
    <div class="card" id="${x}" style="width:50%; margin:auto;
        
    border: 2px solid -webkit-linear-gradient(left, #3931af, #00c6ff);
    box-shadow: 4px 4px 4px #000;
    padding: 10px 10px;
    height: auto;
    background-image: none;
    background: #cfd7e6">
  <div class="card-header" style="text-align:center"><strong>
    Edit your meal: </strong>
  </div>
  <div class="card-body">
  <div class="modal-body">
  <form>
      <div class="mb-3">
          <label for="recipient-name" class="col-form-label">Meal Name:</label>
          <input type="text" class="form-control" id="recipientnameupdater">
      </div>
      <div class="mb-3">
          <label for="message-text" class="col-form-label">Description:</label>
          <textarea class="form-control" id="messagetextupdater"></textarea>
      </div>
      <div class="mb-3">
          <label for="message-text" class="col-form-label">Calories:</label>
          <input type="text" class="form-control" id="recipientcaloriesupdater">
      </div>
  </form>
  </div>
  <button type="button" class="btn btn-dark" id="update" onclick=updater() data-bs-dismiss="modal" style="margin:0px 250px 10px; width:30%">Update</button>
  </div>
</div>
    `
    
}


function updater(){
    xup = document.getElementById("recipientnameupdater").value;
    yup = document.getElementById("messagetextupdater").value;
    zup = document.getElementById("recipientcaloriesupdater").value;
    console.log(xup)
    console.log(yup);
    console.log(zup);

    console.log(document.getElementById("$"));
    

}