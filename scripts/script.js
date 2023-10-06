const prevButtom = document.querySelector('.prev-control');
const nextButton = document.querySelector('.next-control');
const bulletsList = document.querySelector('.pagination');
const bullits = document.querySelectorAll('.pagination-btn');
const screens = document.querySelectorAll('.slider-item');


const fedbackLink = document.querySelector('.fedback-btn');
const modal = document.querySelector('.modal-overlay');
const closeButton = document.querySelector('.modal-close-btn');


if (screens) {
  const bulletsArray = Array.from(bullits);
  const screensArray = Array.from(screens);

  const model = [true, false, false];


  const getCurrentElement = () => model.findIndex((index) => index);

  const updateModel = (index) => {
    model.forEach((item, i) => {
      model[i] = i === index;
    });
  };

  const renderActiveBullit = () => {
    const currentIndex = getCurrentElement();
    document.querySelector('.current-btn').classList.remove('current-btn');
    bulletsArray[currentIndex].classList.add('current-btn');
  };

  const renderActiveScreen = () => {
    const currentIndex = getCurrentElement();
    document.querySelector('.slide-active').classList.remove('slide-active');
    screensArray[currentIndex].classList.add('slide-active');

    screensArray.slice(currentIndex).forEach((item, i) => {
      item.style.order = i;
    });

    screensArray.slice(0, currentIndex).forEach((item, i) => {
      item.style.order = screensArray.length - currentIndex + i;
    });

    document.body.classList = [];
    document.body.classList.add(`bg-${currentIndex + 1}`);
  };

  const getPrevIndex = () => {
    let current = getCurrentElement();
    return current - 1 >= 0 ? current - 1 : model.length - 1;
  };

  const getNextIndex = () => {
    let current = getCurrentElement();
    return current + 1 <= model.length - 1 ? current + 1 : 0;
  };


  prevButtom.addEventListener('click', () => {
    let index = getPrevIndex();
    updateModel(index);
    renderActiveScreen();
    renderActiveBullit();
  });

  nextButton.addEventListener('click', () => {
    let index = getNextIndex();
    updateModel(index);
    renderActiveScreen();
    renderActiveBullit();
  });

  bulletsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('pagination-btn')) {
      let clickedButtonIndex = bulletsArray.indexOf(e.target);
      updateModel(clickedButtonIndex);
      renderActiveScreen();
      renderActiveBullit();
    }
  });

}


// для модалки
fedbackLink.addEventListener('click', (evt) => {
  evt.preventDefault();
  modal.classList.add('modal-show');
});

closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  modal.classList.remove('modal-show');
});
