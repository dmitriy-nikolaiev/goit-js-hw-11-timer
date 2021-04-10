import './styles.css';

class CountdownTimer {
  #element;
  #timerId = null;

  constructor(selector, targetDate) {
    this.selector = selector;
    this.targetDate = targetDate;
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
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    this.#element.querySelector(
      '[data-value="secs"]',
    ).textContent = this.transformValues(secs);
    this.#element.querySelector(
      '[data-value="mins"]',
    ).textContent = this.transformValues(mins);
    this.#element.querySelector(
      '[data-value="hours"]',
    ).textContent = this.transformValues(hours);
    this.#element.querySelector(
      '[data-value="days"]',
    ).textContent = this.transformValues(days);
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
