import './styles.css';

class CountdownTimer {
  #element;
  #timerId = null;

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

    if (time <= 0) {
      clearInterval(this.#timerId);
      return;
    }

    this.#element.querySelector(
      '[data-value="secs"]',
    ).textContent = this.transformValues(this.getSeconds(time));
    this.#element.querySelector(
      '[data-value="mins"]',
    ).textContent = this.transformValues(this.getMinutes(time));
    this.#element.querySelector(
      '[data-value="hours"]',
    ).textContent = this.transformValues(this.getHours(time));
    this.#element.querySelector(
      '[data-value="days"]',
    ).textContent = this.transformValues(this.getDays(time));
  }

  init() {
    this.#element = document.querySelector(this.selector);

    this.#timerId = setInterval(() => {
      this.render();
    }, 1000);
  }
}

const timer = new CountdownTimer('#timer-1', new Date('Jul 17, 2021'));
timer.init();
