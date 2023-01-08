var items = 
[
    /*
    {
        Name : "Raspberry PI",
        Qty : 9,
        Price: 349.99,
    },

    {
        Name : "Arduino Mega",
        Qty : 5,
        Price: 41.37,
    },

    {
        Name : "Arduino UNO",
        Qty : 4,
        Price: 12.50,
    },

    {
        Name : "Arduino Nano",
        Qty : 5,
        Price: 7.50,
    },    
    
    {
        Name : "Arduino Mega",
        Qty : 8,
        Price: 41.37,
    },

    {
        Name : "Arduino UNO",
        Qty : 9,
        Price: 12.50,
    },

    {
        Name : "Arduino Nano",
        Qty : 5,
        Price: 7.50,
    },    
    
    {
        Name : "Arduino Mega",
        Qty : 1,
        Price: 41.37,
    },

    {
        Name : "Arduino UNO",
        Qty : 9,
        Price: 12.50,
    },
    */
];
var customer = 21;

var LastOperation = 0;
var Basket = new Array(items.length).fill(0);
var SumaKoszyka = 0;
var items2 = [];
var szukanie;
let htmlCode = ``;
let a = 0;
newItems = [];



var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = () => 
{
    if(LastOperation == 1)
    {
        return;
    }
    if (xmlhttp.readyState == XMLHttpRequest.DONE) 
    {
        var products = xmlhttp.responseText.split(",");
        var productsArray = [];
        let lastName = "";
        for(let i=0; i < products.length; i++)
        {
            if(products[i] != "~")
            {
                if(lastName.length != 0)
                {
                    lastName = lastName + "," + products[i];
                }
                else
                {
                    console.log("products");
                    lastName = products[i];
                }
            }
            else
            {
                productsArray.push(lastName);
                lastName = "";

            }
        }
        console.log(products);
        console.log(productsArray);
        for (let i = 0; i < productsArray.length; i += 4)
        {
            var obj = {};
            for(let j = 0; j < 4; j++)
            {
                //obj[j-1] = productsArray[i+j];
                switch(j)
                {   
                    case 0:
                        id1 = productsArray[i+j];
                        break;
                    case 1:
                        name1 = productsArray[i+j];
                    break;
                    case 2:
                        qty1 = parseInt(productsArray[i+j]);
                        break;
                    case 3:
                        price1 = parseFloat(productsArray[i+j]).toFixed(2);
                    break;
                }
            }
            obj = {id : id1, Name: name1, Qty : qty1, Price : price1};
            items.push(obj);
            Basket.push(0);
        }
        console.log(items);
        items.forEach(function(singleItem)
        {   // id= ${a} onclick="funkcja(${a})"
            htmlCode = htmlCode + 
            `
            <article>
                <div class="Karta3" id = ${a}> 
                    <div class="Karta2">
                        <span class="text">
                            <span> ${singleItem.Name} </span>
                        </span>
                    </div>
                    <span class="text">
                        <span> Cena: ${singleItem.Price} </span>
                    </span>
                    <span class="text">
                        <span> Ilosc: ${singleItem.Qty} </span>
                    </span>
                    <div class = "Qty" style="margin-top: 25px;">
                    <button id = "Przycisk" onclick="funkcjaMinus(${a})"class = "PrzyciskPM">
                        -
                    </button>
                    <td align="center">
                    <input class="QtyInput" id = "Qty ${a}"  value="0" onfocusout="myFunction(this, ${a})" onkeydown="search(this, ${a})">
                    </td>
                    <button id = "Przycisk" onclick="funkcjaPlus(${a})" class = "PrzyciskPM">
                        +
                    </button>
                    </div>
                    
                </div>
                
            </article>
            `;
            a++;
        });

        const itemsCards = document.querySelector(".all-items-cards");
        itemsCards.innerHTML = htmlCode;
    }
}
LastOperation = 0;
var URL = 'https://script.google.com/macros/s/AKfycbyvKgJRe1CQ12GUX8mUf46ecWdoGYfyOwKIQr3GmW8LpSR2ocM-XSvfoeyA0NF1RbH0/exec?id=1&apiCommand=GetProducts';
xmlhttp.open("GET", URL,true);//??
xmlhttp.send();
console.log("Wysłano");






function funkcjaMinus(a)
{
    let PoleTekstowe = document.getElementById("Qty " + a)
    if(!PoleTekstowe.classList.contains('QtyInput'))
    {
        return;
    }
    if (Basket[a] > 0)
    {
        Basket[a]--;
    }
    else
    {
        console.log("Brak wybranego przedmiotu w koszyku")
        rozwijanie2(a,"Brak w koszyku")
    }
    //console.log("MMinus" + a);//(document.getElementById(a).textContent.Name)
    //document.getElementById("Przycisk").textContent = document.getElementById(a).textContent.Name;
    console.log(Basket[a]);
    document.getElementById("Qty " + a).value = Basket[a];
}
function funkcjaPlus(a)
{   
    let PoleTekstowe = document.getElementById("Qty " + a)
    if(!PoleTekstowe.classList.contains('QtyInput'))
    {
        return;
    }
    if (items[a].Qty > Basket[a])
    {
        Basket[a]++;
    }
    else
    {
        console.log("Brak większej ilości przedmiotu w magazynie")
        rozwijanie2(a,"Brak większej ilości")
    }
    document.getElementById("Qty " + a).value = Basket[a];
}
function funkcjaSzukaj(a)
{
    if(a == 1)
    {
        Pole = document.getElementById("PoleSzukania");
    }
    if(a == 2)
    {
        Pole = document.getElementById("PoleSzukania2");
    }
    if(Pole.value == "" && !szukanie)
    {
        rozwijanieSzukanie(a,1)
        return
    }
    else if(Pole.value == "" && szukanie)
    {
        szukanie = 0;
    }
    else
    {
        szukanie = 1;
    }
    for (let index = 0; index < items.length; index++) 
    {
        if(items[index].Name.toUpperCase().includes(Pole.value.toUpperCase()))
        {
            newItems.push(index);
        }
    }
    console.log(newItems)
    let currentIndex = 0;
    if(newItems.length == 0)
    {
        szukanie = 0;
        rozwijanieSzukanie(a,0)
        return
    }
    for(let index = 0; index < items.length; index++)
    {   
        if(newItems[currentIndex] != index)
        {
            document.getElementById(index).style.display = "none";
        }
        else
        {
            document.getElementById(index).style.display = "inline-flex";
            currentIndex++;
        }
    }
    newItems = [];
}



function pokazKoszyk()
{
    if (document.getElementById("Koszyk2").style.display != "none")
    {  
        document.getElementById("Koszyk2").style.display = "none";
        document.getElementById("PrzyciskKoszyk").textContent = "Koszyk";
        document.getElementById("podsumowanie1").style.display = "none";
        document.getElementById("KartyPrzedmiotow").style.display = "inline-flex";
        document.getElementById("PoleSzukania").style.display = "block";
        document.getElementById("PrzyciskSzukaj").style.display = "block";
        document.getElementById("Szukaj przedmiotu").style.display = "block";
        document.getElementById("Navbardiv").style.width = "25%" ;
        return;
    }
    
    let basketNotEmpty = 0;
    for(let i = 0; i < Basket.length; i++)
    {
        if(Basket[i] != 0)
        {
            basketNotEmpty = 1;
            break;
        }  
    }
    if(!basketNotEmpty)
    {
        console.log("Koszyk pusty");
        rozwijanieKoszyk();
        return;
    }
    aktualizujsume();
    document.getElementById("Navbardiv").style.width = "62%" ;
    let htmlCode2 = 
    `
    <table style="max-width: 80%;">
        <thead>
            <tr>
                <th class = "Nazwa" >Przedmiot</th>
                <th class = "Nazwa" >Cena</th>
                <th class = "Nazwa" >Ilość</th>
                <th class = "Nazwa" >Suma</th>
            </tr>
        </thead>
        <tbody>
    `;
    
    document.getElementById("PoleSzukania").style.display = "none";
    document.getElementById("PrzyciskSzukaj").style.display = "none";
    document.getElementById("Szukaj przedmiotu").style.display = "none";
    document.getElementById("Koszyk2").style.display = "inline-flex";
    document.getElementById("podsumowanie1").style.display = "inline-flex";
    document.getElementById("KartyPrzedmiotow").style.display = "none";
    document.getElementById("PrzyciskKoszyk").textContent = "Wróć";
    document.getElementById("sumakoszyka2").textContent = SumaKoszyka.toFixed(2);
    console.log(Basket);
    for(let i = 0; i < Basket.length; i++)
    {
        if(Basket[i] != 0)
        {
            htmlCode2 = htmlCode2 + 
            `
            <tr>
            <td class = "Nazwa" style = "width : 50%"> ${items[i].Name}</td>
            <td class = "Nazwa" align="center" style = "width : 18%">${items[i].Price}</td>
            <td class = "Nazwa" align="center" style = "width : 12%">
                <div class = "Qty2">
                    <button id = "Przycisk" class = "PrzyciskPM" onclick="funkcjaMinusB(${i})">-</button>
                    <input class="QtyInput" id = "QtyB ${i}"  value="${Basket[i]}">
                    <button id = "Przycisk" class = "PrzyciskPM" onclick="funkcjaPlusB(${i})">+</button>
                </div>
            </td>
            <td align = "center" class = "Nazwa" id = "SumaB ${i}" style = "width : 20%">${(items[i].Price * Basket[i]).toFixed(2)}</td>
            </tr>

            `
        }
    }
    htmlCode2 = htmlCode2 + 
        `    
        </tbody>
    </table>
            `
    document.querySelector(".Koszyk").innerHTML = htmlCode2;
    
}

function aktualizujsume()
{
    SumaKoszyka = 0;
    console.log(Basket);
    for(let i=0; i < Basket.length; i++) 
    {
        SumaKoszyka = SumaKoszyka + Basket[i] * items[i].Price
    }
}
function funkcjaMinusB(a)
{
    if (Basket[a] > 0)
    {
        Basket[a]--;
    }
    else
    {
        console.log("Wybrany produkt został usuniety z koszyka")
    }
    aktualizujsume()
    document.getElementById("Qty "   + a).value = Basket[a];
    document.getElementById("QtyB "  + a).value = Basket[a];
    document.getElementById("SumaB " + a).textContent = (Basket[a] * items[a].Price).toFixed(2);
    document.getElementById("sumakoszyka2").textContent = SumaKoszyka.toFixed(2);
}
function funkcjaPlusB(a)
{
    if (items[a].Qty > Basket[a])
    {
        Basket[a]++;
    }
    else
    {
        console.log("Brak większej ilości przedmiotu w magazynie")
    }
    aktualizujsume()
    document.getElementById("Qty "  + a).value = Basket[a];
    document.getElementById("QtyB " + a).value = Basket[a];
    document.getElementById("SumaB " + a).textContent = (Basket[a] * items[a].Price).toFixed(2);
    document.getElementById("sumakoszyka2").textContent = SumaKoszyka.toFixed(2);
    
    
}



function rozwijanie2(a,string1)
{
    var PoleTekstowe = document.getElementById("Qty " + a)
    if(!PoleTekstowe.classList.contains('QtyInput'))
    {
        return;
    }
    console.log("Qty " + a)
    PoleTekstowe.classList.add('rozwijanie')
    PoleTekstowe.classList.remove('QtyInput')
    PoleTekstowe.readOnly = true;
    PoleTekstowe.onanimationend = function()
    {
        if(PoleTekstowe.classList.contains('rozwijanie'))
        {
            PoleTekstowe.classList.remove('rozwijanie')
            PoleTekstowe.classList.add('zwijanie')
            PoleTekstowe.value = string1
        }
           else if(PoleTekstowe.classList.contains('zwijanie'))
        {
            PoleTekstowe.classList.remove('zwijanie')
            PoleTekstowe.classList.add('QtyInput')
            PoleTekstowe.readOnly = false;
            PoleTekstowe.value = Basket[a]
        }
    }
}
function rozwijanieKoszyk()
{
    let Przycisk = document.getElementById("PrzyciskKoszyk")
    Przycisk.classList.add('przyciskKoszykrozwiniety')
    Przycisk.classList.remove('przyciskKoszyk')
    Przycisk.textContent = "Koszyk jest pusty"
    Przycisk.onanimationend = function()
    {
        Przycisk.classList.add('przyciskKoszyk')
        Przycisk.classList.remove('przyciskKoszykrozwiniety')
        Przycisk.textContent = "Koszyk"
    }
}
function rozwijanieSzukanie(a,b = 1)
{
    //if(document.getElementById("PrzyciskSzukaj").classList.contains('przyciskKoszykrozwiniety') || document.getElementById("PrzyciskSzukaj2").classList.contains('przyciskKoszykrozwiniety'))
    //{
    //    return
    //}
    let PrzyciskNazwa;
    let KlasaNazwa1;
    let KlasaNazwa2;
    if(a == 1)
    {
        PrzyciskNazwa = "PrzyciskSzukaj"
        KlasaNazwa1 = "przyciskKoszykrozwiniety"
        KlasaNazwa2 = "przyciskKoszyk"
    }
    if(a == 2)
    {
        PrzyciskNazwa = "PrzyciskSzukaj2"
        KlasaNazwa1 = "przyciskKoszykrozwiniety2"
        KlasaNazwa2 = "przyciskKoszyk2"
    }

    let Przycisk = document.getElementById(PrzyciskNazwa);
    Przycisk.classList.add(KlasaNazwa1)
    Przycisk.classList.remove(KlasaNazwa2)
    if(b)
    {
        Przycisk.textContent = "Wprowadź nazwę"
    }
    else
    {
        Przycisk.textContent = "Brak produktu"
    }
    Przycisk.onanimationend = function()
    {
        Przycisk.classList.add(KlasaNazwa2)
        Przycisk.classList.remove(KlasaNazwa1)
        Przycisk.textContent = "Szukaj"
    }
}



function myFunction(ele, a)
{
    if(isNaN(ele.value))
    {
        console.log("Wpisz wartość liczbową!!")
    } 
    else
    {
        Basket[a] = ele.value
    }  
}
function search(ele,a) 
{
    if(event.key === 'Enter') 
    {
        if(isNaN(ele.value))
        {
            console.log("Wpisz wartość liczbową!!")
        } 
        else
        {
            Basket[a] = ele.value
        }     
    }
}

function Kup()
{
    var xmlhttp = new XMLHttpRequest();
    var URL = 'https://script.google.com/macros/s/AKfycbyvKgJRe1CQ12GUX8mUf46ecWdoGYfyOwKIQr3GmW8LpSR2ocM-XSvfoeyA0NF1RbH0/exec?id=1&apiCommand=NewOrder&customer=';
    URL += customer
    URL += '&values2=0,5,6,'
    for(let i = 0; i < Basket.length; i++)
    {
        if(Basket[i] != 0)
        {
            URL = URL + items[i].id + ',' + Basket[i]+ ','
        }
    }
    URL = URL.slice(0,-1)
    console.log(URL)
    LastOperation = 1;
    xmlhttp.open("GET", URL,true);//??
    xmlhttp.send();
}