/**
 * 
 * @author: Eneh, James 
 */
function toggleMenu(X) {
    X.classList.toggle("change");
    var x = document.getElementById("nav");
    if (x.className === "nav") {
        x.className += " responsive";
    } else {
        x.className = "nav";
    }
}

function openEditForm (id, title, desc, conclude) {
    const editForm = document.getElementById("entryDiv");
    if (! editForm.style.maxHeight){
      editForm.style.maxHeight = editForm.scrollHeight + "px";
    } 
    $("#entryId").val(id);
    $("#title").val(title);
    $("#desc").val(desc);
    $("#conclude").val(conclude)
    $("#submit").val("Save Changes");
  }
  function resetEntryForm () {
    $("#entryId").val("");
    $("#title").val("");
    $("#desc").val("");
    $("#conclude").val("")
    $("#submit").val("Add Entry");
  }

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

var entryList = [
    {
        "id": 2,
        "title": "My Paris Trip",
        "desc": "I enjoyed every moment of it, France made my year",
        "conclude": "That was cool",
        "date": "10-09-2016"
    },
    {
        "id": 3,
        "title": "My Isreal Visit",
        "desc": "I was wow in Jeruselem",
        "conclude": "Solomon's temple is out of this world, really a place to...",
        "date": "15-06-2017"
    }
];
function renderEntryList (list) {
    list.forEach(element => {
        var span = document.createElement("span");
        var txt = document.createTextNode(element["title"]+".. "+element["date"]);
        span.appendChild(txt);

        var i1 = document.createElement("i");
        i1.setAttribute("class", "fa fa-trash");
        txt = document.createTextNode(" Delete");
        i1.appendChild(txt);
        var btn1 = document.createElement("button");
        btn1.setAttribute("class", "danger");
        btn1.appendChild(i1);
        
        var i2 = document.createElement("i");
        i2.setAttribute("class", "fa fa-angle-down");
        var btn2 = document.createElement("button");
        btn2.setAttribute("class", "collapsible");
        btn2.appendChild(i2);
        
        var readDiv = document.createElement("div");
        var br = document.createElement("br");

        const strong1 = document.createElement("strong");
        txt = document.createTextNode("Title: ");
        strong1.appendChild(txt);
        readDiv.appendChild(strong1);
        const small1 = document.createElement("small");
        txt = document.createTextNode(element["title"]);
        small1.appendChild(txt);
        readDiv.appendChild(small1);
        readDiv.appendChild(br);

        const strong2 = document.createElement("strong");
        txt = document.createTextNode("Description: ");
        strong2.appendChild(txt);
        readDiv.appendChild(strong2);
        const small2 = document.createElement("small");
        txt = document.createTextNode(element["desc"]);
        small2.appendChild(txt);
        readDiv.appendChild(small2);
        br = document.createElement("br");
        readDiv.appendChild(br);

        const strong3 = document.createElement("strong");
        txt = document.createTextNode("Conclusion: ");
        strong3.appendChild(txt);
        readDiv.appendChild(strong3);
        const small3 = document.createElement("small");
        txt = document.createTextNode(element["conclude"]);
        small3.appendChild(txt);
        readDiv.appendChild(small3);
        br = document.createElement("br");
        readDiv.appendChild(br);

        const strong4 = document.createElement("strong");
        txt = document.createTextNode("Date: ");
        strong4.appendChild(txt);
        readDiv.appendChild(strong4);
        const small4 = document.createElement("small")
        txt = document.createTextNode(element["date"]);
        small4.appendChild(txt);
        readDiv.appendChild(small4);
        br = document.createElement("br");
        readDiv.appendChild(br);

        const a = document.createElement("a");
        a.setAttribute("href","#entryDiv");
        a.setAttribute("onclick",`openEditForm("${element["id"]}", "${element["title"]}", "${element["desc"]}", "${element["conclude"]}")`);
        txt = document.createTextNode("Make changes");
        a.appendChild(txt);
        readDiv.appendChild(a);

        const p = document.createElement("p");
        p.appendChild(readDiv);

        const content = document.createElement("div");
        content.setAttribute("class", "content");
        content.appendChild(p);

        const div = document.createElement("div");
        div.appendChild(span);
        div.appendChild(btn1);
        div.appendChild(btn2);
        div.appendChild(content);
        const li = document.createElement("li");
        li.appendChild(div);

        document.getElementById("myUL").appendChild(li);

    });
}

renderEntryList (entryList);

var coll = document.getElementsByClassName("collapsible");
var j;

for (j = 0; j < coll.length; j++) {
  coll[j].addEventListener("click", function() {
    resetEntryForm ();
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    const toggleIcon = this.firstElementChild;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
      if (toggleIcon) {
        toggleIcon.setAttribute("class","fa fa-angle-down");
      }
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      if (toggleIcon) {
        toggleIcon.setAttribute("class","fa fa-angle-up")
        }
    }
  });
}