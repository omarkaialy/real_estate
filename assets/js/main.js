// Api requests
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
    articlePopularPrice.className = "popular__price";
    articlePopularTitle.className = "popular__title";
    articlePopularDescription.className = "popular__description";

    const element = result[index];
    article.appendChild(articleImg);

    article.appendChild(articlePopular);
    // article.appendChild(objectId);
    articlePopularPrice.innerHTML = element.get("price");
    articlePopularTitle.innerHTML = element.get("name");
    articlePopularDescription.innerHTML = element.get("address");
    articleImg.className = "popular__img";
    articleImg.src = element.get("image");
    articlePopular.appendChild(articlePopularPrice);
    articlePopular.appendChild(articlePopularTitle);
    articlePopular.appendChild(articlePopularDescription);
    let wrapper = document.getElementById("wrapper");
    wrapper.appendChild(article);
  }
  const showDetailsModal = document.querySelectorAll(".popular__card");
  showDetailsModal.forEach((item) => {
    item.addEventListener("click", () => {
      document.getElementById("detailModal").style.display = "block";
      document.getElementById("property__name").value = item
        .querySelector(".popular__data")
        .querySelector(".popular__title").innerHTML;
      document.getElementById("property__image").src =
        item.querySelector(".popular__img").src;
      document.getElementById("property__price").value = item
        .querySelector(".popular__data")
        .querySelector(".popular__price").innerHTML;
      document.getElementById("property__address").value = item
        .querySelector(".popular__data")
        .querySelector(".popular__description").innerHTML;

      var closeButton = document.getElementById("close_modal");
      var deleteBtn = document.getElementById("delete");
      var updateBtn = document.getElementById("update");
      closeButton.addEventListener("click", () => {
        document.getElementById("detailModal").style.display = "none";
      });
      deleteBtn.addEventListener("click", () => {
        readThenDelete(
          item.querySelector(".popular__data").querySelector(".popular__title")
            .innerHTML
        );
      });
      updateBtn.addEventListener("click", () => {
        readThenUpdate(
          item.querySelector(".popular__data").querySelector(".popular__title")
            .innerHTML
        );
      });
    });
  });
}

function create() {
  var Appartment = Parse.Object.extend("Appartment");
  const newAppartment = new Appartment();

  var modal = document.getElementById("modal__add");

  var name = document.getElementById("property__name").value;
  var price = document.getElementById("property__price").value;
  var address = document.getElementById("property__address").value;
  var fileUploadControl = document.getElementById("imageFile");
  var image;
  fileUploadControl.addEventListener("change", (target) => {
    console.log(target.files.length);
  });
  if (fileUploadControl.files.length > 0) {
    var file = fileUploadControl.files[0];
    var fileName = file.name;
    console.log("file uploaded" + fileName);
    const parseFile = new Parse.File("image.jpg", file);
    parseFile.save().then((img) => {
      image = img._url;
      {
        newAppartment.set("name", name);
        newAppartment.set("address", address);
        newAppartment.set("price", price);
        newAppartment.set("image", img._url);
        newAppartment.save().then((res) => {
          console.log("created Successfully" + res);
          modal.style.display = "none";
        });
      }
    });
  }
  // modal.style.display = "none";
}

function readThenUpdate(name) {
  var Appartment = Parse.Object.extend("Appartment");

  query = new Parse.Query(Appartment);
  query.equalTo("name", name);
  query.first().then(function (Appartment) {
    if (Appartment) {
      Appartment.set("price", document.getElementById("property__price").value);
      Appartment.set(
        "address",
        document.getElementById("property__address").value
      );
      foundPet.save();
    }
  });
}
// Api Delete

function readThenDelete(name) {
  var Appartment = Parse.Object.extend("Appartment");
  textName = name;
  query = new Parse.Query(Appartment);
  query.equalTo("name", textName);
  query.first().then(function (pet) {
    if (pet) {
      pet.destroy();
    }
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
  centeredSlides: false,
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
/*================ Modals ==================*/

const showModalAdd = document.querySelectorAll(".subscribe__button");
showModalAdd.forEach((item) => {
  item.addEventListener("click", () => {
    showAddModal();
  });
});

function showAddModal() {
  var modal = document.getElementById("modal__add");
  modal.style.display = "block";
  var closeButton = document.getElementById("close_modal");
  var createBtn = document.getElementById("createbtn");
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
  createBtn.addEventListener("click", () => {
    create();
  });
}

window.onclick = function (event) {
  var modal = document.getElementById("modal__add");
  if (event.target == modal) {
    modal.style.display = "none";
  }
  var detailModal = document.getElementById("detailModal");
  if (event.target == detailModal) {
    detailModal.style.display = "none";
  }
};
