class Activity {
  constructor({ id, title, description, imgUrl }) {
    (this.id = id),
      (this.title = title),
      (this.description = description),
      (this.imgUrl = imgUrl);
  }
}

class Repository {
  constructor() {
    this.activities = [];
    this.id = 0;
  }

  getAllActivities = () => this.activities;

  createActivity = (activityObj) => {
    this.id++;
    const activity = new Activity({ id: this.id, ...activityObj });
    this.activities.push(activity);
  };

  deleteActivity(id) {
    this.activities = this.activities.filter((activity) => activity.id !== id);
  }
}

const repository = new Repository();

const render = () => {
  const cards = document.getElementById("cards");
  cards.innerHTML = "";

  repository.getAllActivities().map((act) => {
    const card = document.createElement("div");
    card.className = "card";

    const cardTitle = document.createElement("h3");
    cardTitle.innerText = act.title;

    const cardDescription = document.createElement("p");
    cardDescription.innerText = act.description;

    const cardImgUrl = document.createElement("img");
    cardImgUrl.setAttribute("src", act.imgUrl);

    const cardDelButton = document.createElement("button")
    cardDelButton.className= "delete"
    cardDelButton.innerText = "X"
    cardDelButton.id = act.id

    card.appendChild(cardDelButton)
    card.appendChild(cardTitle);
    card.appendChild(cardDescription);
    card.appendChild(cardImgUrl);
    

    cards.appendChild(card);
    cardDelButton.addEventListener("click", function (event){
      event.preventDefault()
      repository.deleteActivity(act.id)
      render()
    })
  });
  
};

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const objActivity = {
    title: title.value,
    description: description.value,
    imgUrl: imgUrl.value,
  };
  if(!title.value || !description.value || !imgUrl.value){
    alert("Hay campos vacios")
    return
  }
  repository.createActivity(objActivity);
  render();
  form.reset();
});
