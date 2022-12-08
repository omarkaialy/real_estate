async function read() {
  var Appartment = Parse.Object.extend("Appartment");

  query = new Parse.Query(Appartment);

  let result = await query.find();
  for (let index = 0; index < result.length; index++) {
    let article = document.createElement("article");
    let articleImg = document.createElement("img");
    let articlePopular = document.createElement("div");
    let articlePopularPrice = document.createElement("h2");
    let articlePopularTitle = document.createElement("h3");
    let articlePopularDescription = document.createElement("p");
    article.className = "popular__card swiper-slide x";
    articlePopular.className = "popular__data";
    articlePopularPrice.className = "popular__title";

    const element = result[index];
    article.appendChild(articleImg);
    article.appendChild(articlePopular);
    articlePopularPrice.innerHTML = element.get("price");
    articlePopularTitle.innerHTML = element.get("name");
    articlePopularDescription.innerHTML = element.get("address");
    articlePopular.appendChild(articlePopularPrice);
    articlePopular.appendChild(articlePopularTitle);
    articlePopular.appendChild(articlePopularDescription);
    let wrapper = document.getElementById("wrapper");
    wrapper.appendChild(article);
  }
}

function create() {
  var Appartment = Parse.Object.extend("Appartment");
  const mypet = new Appartment();
  var modal = document.getElementById("modal__add");

  var textName = "myName";
  mypet.set("name", textName);

  mypet
    .save()
    .then(function (appartment) {
      console.log(
        "Appartment created successful with name: " +
          appartment.get("name") +
          " and age: " +
          appartment.get("agePet")
      );
      modal.style.display = "none";
    })
    .catch(function (error) {
      console.log("Error: " + error.message);
    });
}

function readThenUpdate() {
  var Appartment = Parse.Object.extend("Appartment");
  textName = "myName";

  query = new Parse.Query(Appartment);
  query.equalTo("name", textName);
  query
    .first()
    .then(function (pet) {
      if (pet) {
        console.log("Appartment found with name: " + pet.get("name"));
        update(pet);
      } else {
        console.log("Nothing found, please try again");
      }
    })
    .catch(function (error) {
      console.log("Error: " + error.code + " " + error.message);
    });
}
function update(foundPet) {
  textName = "myName";
  foundPet.set("name", textName);

  foundPet
    .save()
    .then(function (pet) {
      console.log("Appartment updated! Name: " + pet.get("name"));
    })
    .catch(function (error) {
      console.log("Error: " + error.message);
    });
}
// Api Delete

function readThenDelete() {
  var Appartment = Parse.Object.extend("Appartment");
  textName = "myName";
  query = new Parse.Query(Appartment);
  query.equalTo("name", textName);
  query
    .first()
    .then(function (pet) {
      if (pet) {
        console.log("Appartment found with name: " + pet.get("name"));
        deletePet(pet);
      } else {
        console.log("Nothing found, please try again");
        return null;
      }
    })
    .catch(function (error) {
      console.log("Error: " + error.code + " " + error.message);
      return null;
    });
}

function deletePet(foundPet) {
  foundPet
    .destroy()
    .then(function (response) {
      console.log(
        "Appartment " + foundPet.get("name") + " erased successfully"
      );
    })
    .catch(function (response, error) {
      console.log("Error: " + error.message);
    });
}

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  if (this.scrollY >= 50) header.classList.add("scroll-header");
}
window.addEventListener("scroll", scrollHeader);
/*=============== SWIPER POPULAR ===============*/
var swiperPopular = new Swiper(".popular__container", {
  spaceBetween: 32,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: false,
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
});
/*=============== VALUE ACCORDION ===============*/
const accordionItems = document.querySelectorAll(".value__accordion-item");
accordionItems.forEach((item) => {
  const accordionHeader = item.querySelector(".value__accordion-header");

  accordionHeader.addEventListener("click", () => {
    const openItem = document.querySelector(".accordion-open");
    toggleItem(item);
    if (openItem && openItem !== item) {
      toggleItem(openItem);
    }
  });
});
const toggleItem = (item) => {
  const accordionContent = item.querySelector(".value__accordion-content");
  if (item.classList.contains("accordion-open")) {
    accordionContent.removeAttribute("style");
    item.classList.remove("accordion-open");
  } else {
    accordionContent.style.height = accordionContent.scrollHeight + "px";
    item.classList.add("accordion-open");
  }
};

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const section = document.querySelectorAll("section[id]");
function scrollActive() {
  const scrollY = window.pageYOffset;
  section.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 80,
      sectionId = current.getAttribute("id");
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);
/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  if (this.scrollY >= 350) {
    scrollUp.classList.add("show-scroll");
  } else {
    scrollUp.classList.remove("show-scroll");
  }
}
window.addEventListener("scroll", scrollUp);
/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";
if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
    iconTheme
  );
}
themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 100,
  reset: true,
});
sr.reveal(
  ".home__title, .popular__container  , .subscribe__container ,.footer--container "
);
sr.reveal(".home__description,.footer--info", { delay: 200 });
sr.reveal(".home__search", { delay: 300 });
sr.reveal(".home__value", { delay: 400 });

sr.reveal(".value__images", { origin: "left" });
sr.reveal(".value__content", { origin: "right" });

sr.reveal(".contact__images", { origin: "right" });
sr.reveal(".contact__content", { origin: "left" });
// Api Request
// Api Read

// let articlesImages = document.querySelectorAll(".swiper-wrapper article img");
// let articlesTitles = document.querySelectorAll(
//   ".swiper-wrapper article .popular__title"
// );
// console.log(articlesImages);

const showModalAdd = document.querySelectorAll(".subscribe__button");
showModalAdd.forEach((item) => {
  item.addEventListener("click", () => {
    showAddModal();
  });
});
//  Modal
function showAddModal() {
  var modal = document.getElementById("modal__add");
  modal.style.display = "block";
  // Get the <span> element that closes the modal
  var span = document.getElementById("close_modal");
  var createbtn = document.getElementById("createbtn");
  span.addEventListener("click", () => {
    modal.style.display = "none";
  });
  createbtn.addEventListener("click", () => {
    read();
  });
}

window.onclick = function (event) {
  var modal = document.getElementById("modal__add");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
