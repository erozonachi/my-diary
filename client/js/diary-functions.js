/**
 * 
 * @author: Eneh, James 
 */

function openEditForm (id, title, desc, conclude) {
  const editForm = document.getElementById("entryDiv");
  if (! editForm.style.maxHeight){
    editForm.style.maxHeight = editForm.scrollHeight + "px";
  } 
  $("#entryId").val(id);
  $("#title").val(title);
  $("#desc").val(desc);
  $("#conclude").val(conclude)
  $("#submit").val("update")
  $("#submit").html('<i class="fa fa-save"></i>&nbsp;Save Changes');
}
function resetEntryForm () {
  $("#entryId").val("");
  $("#title").val("");
  $("#desc").val("");
  $("#conclude").val("")
  $("#submit").val("add")
  $("#submit").html('<i class="fa fa-save"></i>&nbsp;Add Entry');
}

const entryList = [
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
      const span = document.createElement("span");
      let txt = document.createTextNode(element["title"]+".. "+element["date"]);
      span.appendChild(txt);

      const i1 = document.createElement("i");
      i1.setAttribute("class", "fa fa-trash");
      txt = document.createTextNode(" Delete");
      i1.appendChild(txt);
      const btn1 = document.createElement("button");
      btn1.setAttribute("class", "danger del");
      btn1.appendChild(i1);
      
      const i2 = document.createElement("i");
      i2.setAttribute("class", "fa fa-angle-down");
      const btn2 = document.createElement("button");
      btn2.setAttribute("class", "collapsible toggle");
      btn2.appendChild(i2);
      
      const readDiv = document.createElement("div");
      let br = document.createElement("br");

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
      const head = document.createElement("div");
      head.setAttribute("class", "listHead");
      head.appendChild(span);
      head.appendChild(btn1);
      head.appendChild(btn2);
      const div = document.createElement("div");
      div.appendChild(head)
      div.appendChild(content);
      const li = document.createElement("li");
      li.appendChild(div);

      document.getElementById("myUL").appendChild(li);

  });
}

renderEntryList (entryList);

const coll = document.getElementsByClassName("collapsible");
let j = 0;

for (j; j < coll.length; j++) {
coll[j].addEventListener("click", function() {
  resetEntryForm ();
  this.classList.toggle("active");
  const parent = this.parentNode;
  const content = parent.nextElementSibling;
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