import './styles.css';

class CountdownTimer {
  #element;
  #secsRef;
  #minsRef;
  #hoursRef;
  #daysRef;
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

    this.#secsRef.textContent = this.transformValues(this.getSeconds(time));
    this.#minsRef.textContent = this.transformValues(this.getMinutes(time));
    this.#hoursRef.textContent = this.transformValues(this.getHours(time));
    this.#daysRef.textContent = this.transformValues(this.getDays(time));
  }

  init() {
    try {
      this.#element = document.querySelector(this.selector);
      this.#secsRef = this.#element.querySelector('[data-value="secs"]');
      this.#minsRef = this.#element.querySelector('[data-value="mins"]');
      this.#hoursRef = this.#element.querySelector('[data-value="hours"]');
      this.#daysRef = this.#element.querySelector('[data-value="days"]');
    } catch (error) {
      console.warn('Error! No items found with this selector');
      return;
    }

    this.#timerId = setInterval(() => {
      this.render();
    }, 1000);
  }
}

const timer = new CountdownTimer('#timer-1', new Date('Jul 17, 2021'));
timer.init();
