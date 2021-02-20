var cardDeck = document.getElementById("cardDeck");
async function getvideoList() {
  let res = await fetch("./videoplayer.json");
  let List = await res.json();
  console.log(List);
  CreateList(List.Videos);
}
function onPlayer(item) {
  console.log(item);
  window.location.href = `player.html?id=${item.id}`;
}
function CreateList(List) {
  for (const item of List) {
    let card = document.createElement("div");
    card.setAttribute("class", "card");

    let imageContainer = document.createElement("div");
    imageContainer.setAttribute("class", "image-container");
    imageContainer.setAttribute("onclick", `onPlayer(${JSON.stringify(item)})`);

    let image = document.createElement("img");
    image.setAttribute("src", item.thumbnail);
    image.setAttribute("class", "card-img-top");
    image.setAttribute("alt", item.title);

    imageContainer.append(image);

    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    let titleContainer = document.createElement("div");
    titleContainer.setAttribute("class", "title-container");
    let title = document.createElement("h5");
    title.setAttribute("class", "card-title");
    title.innerHTML = item.title;
    titleContainer.appendChild(title);

    let buttonContainer = document.createElement("div");
    buttonContainer.setAttribute("class", "button-container");

    let button = document.createElement("button");
    button.setAttribute("class", "custom-btn play-button");
    button.setAttribute("title", "Play");
    button.setAttribute("type", "button");
    button.setAttribute("onclick", `onPlayer(${JSON.stringify(item)})`);
    let icon = `<i class="fa fa-play"
    aria-hidden="true"></i>`;
    button.innerHTML = icon;
    buttonContainer.appendChild(button);
    cardBody.appendChild(titleContainer);
    cardBody.appendChild(buttonContainer);
    card.appendChild(imageContainer);
    card.appendChild(cardBody);
    cardDeck.appendChild(card);
  }
}

$(document).ready(function () {
  getvideoList();
});
