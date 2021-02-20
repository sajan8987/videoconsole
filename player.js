var iframe = document.getElementById("iframe");
var listContainer = document.getElementById("list-container");
function changeVideo(item) {
  console.log(item);
  let videoLink = `https://www.youtube.com/embed/${item.id}`;
  iframe.setAttribute("src", videoLink);
}
function createList(List) {
  for (const item of List) {
    let list = document.createElement("div");
    list.setAttribute("class", "list");
    list.setAttribute("onclick", "changeVideo(" + JSON.stringify(item) + ")");
    let imageContainer = document.createElement("div");
    imageContainer.setAttribute("class", "image-container");
    let image = document.createElement("img");
    image.setAttribute("src", item.thumbnail);
    image.setAttribute("alt", item.title);
    imageContainer.appendChild(image);
    let titleContainer = document.createElement("div");
    titleContainer.setAttribute("class", "title-container");
    let title = document.createElement("h5");
    title.innerHTML = item.title;
    titleContainer.appendChild(title);
    list.appendChild(imageContainer);
    list.appendChild(titleContainer);
    listContainer.appendChild(list);
  }
}
async function getvideoList(id) {
  console.log(id);

  let videoLink = `https://www.youtube.com/embed/${id}`;
  iframe.setAttribute("src", videoLink);
  let res = await fetch("./videoplayer.json");
  res.json().then((List) => {
    List.Videos.forEach((item) => {
      if (item.id === id) {
        let filterByCategory = List.Videos.filter((_item) => {
          return _item.category === item.category && _item.id != item.id;
        });
        console.log(filterByCategory);
        createList(filterByCategory);
      }
    });
  });

  // CreateList(List.Videos);
}

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (!id) window.location.href = "index.html";
  else getvideoList(id);
  console.log(id);
};
