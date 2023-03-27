var count = 0
function anagram(list) {
  var letters = {"a": 0,"b": 0,"c": 0,"d": 0,"e": 0,"f": 0,"g": 0,"h": 0,"i": 0,"j": 0,"k": 0,"l": 0,"m": 0,"n": 0,"o": 0,"p": 0,"q": 0,"r": 0,"s": 0,"t": 0,"u": 0,"v": 0,"w": 0,"x": 0,"y": 0,"z": 0,}
 
 list.forEach((item) => {
   Object.keys(letters).forEach((letter) => {
     if (item.includes(letter)) {
       letters[letter] += 1;
     }
   })
 })

  Object.keys(letters).forEach(function(key) {
    if(letters[key] == 0)
    {delete letters[key]}
  if (count > 0 && letters[key] > Math.floor(list.length/2)) {
    delete letters[key]
  }
  })
  var items = Object.keys(letters).map(key => {return [key, letters[key]]})

  items.sort((a, b) => {return b[1]-a[1]})
  var keys = items.map((e)=>{
    return e[0]
  })
  
  var rowdict = {}
  var UsedTings = []
  keys.forEach(function(letter){
    keylist = []
    list.forEach(function(iitem){
      if(!iitem.includes(letter) && !UsedTings.includes(iitem)){
        keylist.push(iitem)
        UsedTings.push(iitem)
      }
    })
    if(keylist.length > 0){
      rowdict[letter] = keylist
    }
  })
  count += 1
  return rowdict
}

function getList(){
  count = 0
  table.innerHTML = ""
  var ta = document.getElementById("input").value
  var list = ta.toLowerCase().split(",").map((word) => { 
    return word[0].toUpperCase(); 
});
  display(list)
}

function formatString(rowdict) {
  var formatedString = ``
  
  if (rowdict.length > 2) {
  rowdict = anagram(rowdict)
    }
  
  if (rowdict.length) {
    for (i = 0; i < rowdict.length; i++) {
      formatedString += i == rowdict.length - 1? `${rowdict[i]}` : `${rowdict[i]}, `
    }
  } else {
    Object.keys(rowdict).forEach((key)=>{
      if(Object.keys(rowdict).indexOf(key) == Object.keys(rowdict).length-1){
        formatedString += `<table><tr><td VALIGN=TOP>${formatString(rowdict[key])} </td></tr></table>`
      } else {
        formatedString += `<table><tr><td VALIGN=TOP>${key} no &rarr;</td><td VALIGN=TOP>${formatString(rowdict[key])} </td></tr><tr><td VALIGN=TOP colspan="1">&darr;</td></tr></table>`
      }
    })
  }
    return formatedString
}

function display(list) {
  var rowdict = anagram(list)
  
  table = document.getElementById("table")
     Object.keys(rowdict).forEach((key)=>{
       var formatedString = formatString(rowdict[key])
      if(Object.keys(rowdict).indexOf(key)==Object.keys(rowdict).length-1){
        table.innerHTML += `<table><tr><td VALIGN=TOP>${formatedString} </td></tr></table>`
      } else {
        table.innerHTML += `<table><tr><td VALIGN=TOP>${key} no &rarr;</td><td VALIGN=TOP colspan="1">${formatedString} </td></tr><tr><td VALIGN=TOP>&darr;</td></tr></table>`
      }
    })
}