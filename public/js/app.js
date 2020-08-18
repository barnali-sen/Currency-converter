
const convertform = document.querySelector('form')
const fromCountry = document.querySelector('select[name="fromCountry"]')
const toCountry = document.querySelector('select[name="toCountry"]')
const messageOne = document.querySelector('#messageOne')
const currencyValue = document.querySelector('#currencyValue')

let name1,name2
function myFunction1() {
    var x = document.getElementById("fromCountry").value;
    name1 = x
 }
 function myFunction2() {
    var x = document.getElementById("toCountry").value;
    name2 = x
}
document.addEventListener('DOMContentLoaded',(e)=>
{
    fetch('http://localhost:6500/currencies').then((response)=>{
        response.json().then((data)=>
        { 
            if(data.e){
                messageOne.textContent = data.e //internet connectivity not avaliable
            }
            else{ 
                let res = data.value
                let array = Object.values(res)
                array.map((item)=>{
                    let opt = document.createElement('option') 
                    opt.className = "dropdown-content"
                    opt.appendChild(document.createTextNode(item.currencyName+'('+item.id+')'))
                    opt.value =item.id
                    fromCountry.appendChild(opt)

                 
                })
                let array1 = Object.values(res)
                array1.map((item)=>{
                    let opt = document.createElement('option')
                    opt.className = "dropdown-content"
                    opt.appendChild(document.createTextNode(item.currencyName+'('+item.id+')'))
                    opt.value =item.id
                    toCountry.appendChild(opt)
                })
            }
        })
    })
})

convertform.addEventListener('submit',(event)=>{
    event.preventDefault();
    const from_value = fromCountry.value;
    const to_value = toCountry.value;
    let val = currencyValue.value
    if(from_value && to_value && val)  //if all the fields are avaliable
    {
        const str = from_value+'_'+to_value;
        fetch('http://localhost:6500/convert?q='+str).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    messageOne.textContent = data.error
                }else{
                    const rate = Object.values(data.result)
                    var finalResult = (currencyValue.value)*rate
                    messageOne.textContent = 'Your result is : '+finalResult
                }
            })
        })
    }else{
    messageOne.textContent = 'Please provide an amount to be converted!'
}
})

