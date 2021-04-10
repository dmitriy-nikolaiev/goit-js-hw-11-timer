import './styles.css';

class CountdownTimer {
  #element;
  #secsRef;
  #minsRef;
  #hoursRef;
  #daysRef;

  constructor(selector, targetDate) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  getDays(time) {
    return Math.floor(time / (1000 * 60 * 60 * 24));
  }

  getHours(time) {
    return Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  }

  getMinutes(time) {
    return Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  }

  getSeconds(time) {
    return Math.floor((time % (1000 * 60)) / 1000);
  }

  transformValues(value) {
    return String(value).padStart(2, '0');
  }

  render() {
    const time = this.targetDate - new Date();
    if (time < 0) {
      this.#element.classList.add('after-date');
    }

    this.#secsRef.textContent = this.transformValues(
      this.getSeconds(Math.abs(time)),
    );
    this.#minsRef.textContent = this.transformValues(
      this.getMinutes(Math.abs(time)),
    );
    this.#hoursRef.textContent = this.transformValues(
      this.getHours(Math.abs(time)),
    );
    this.#daysRef.textContent = this.transformValues(
      this.getDays(Math.abs(time)),
    );
  }

  init() {
    this.#element = document.querySelector(this.selector);
    this.#secsRef = this.#element.querySelector('[data-value="secs"]');
    this.#minsRef = this.#element.querySelector('[data-value="mins"]');
    this.#hoursRef = this.#element.querySelector('[data-value="hours"]');
    this.#daysRef = this.#element.querySelector('[data-value="days"]');

    setInterval(() => {
      this.render();
    }, 1000);
  }
}

const timer = new CountdownTimer('#timer-1', new Date('Jul 17, 2021'));
timer.init();
