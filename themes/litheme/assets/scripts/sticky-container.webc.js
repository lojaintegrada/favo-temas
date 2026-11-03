if (!customElements.get('sticky-container')) {
  /**
   * Custom element that applies sticky positioning only when content is smaller than viewport
   * @class StickyContainer
   * @extends HTMLElement
   */
  class StickyContainer extends HTMLElement {
    constructor() {
      super();
      /** @type {ResizeObserver|null} */
      this._resizeObserver = null;
      /** @type {Function} */
      this._boundUpdateSticky = this.updateStickyBehavior.bind(this);
      /** @type {Function} */
      this._boundHandleHtmxSwap = this.handleHtmxSwap.bind(this);
    }

    /**
     * Called when element is connected to the DOM
     * @returns {void}
     */
    connectedCallback() {
      this.updateStickyBehavior();
      this.initResizeObserver();
      this.initEventListeners();
    }

    /**
     * Called when element is disconnected from the DOM
     * @returns {void}
     */
    disconnectedCallback() {
      this.cleanup();
    }

    /**
     * Updates sticky behavior based on content height vs viewport height
     * @returns {void}
     */
    updateStickyBehavior() {
      const contentHeight = this.scrollHeight;
      const viewportHeight = window.innerHeight;

      if (contentHeight < viewportHeight) {
        this.classList.add('md:sticky');
      } else {
        this.classList.remove('md:sticky');
      }
    }

    /**
     * Initializes ResizeObserver to watch for content size changes
     * @returns {void}
     */
    initResizeObserver() {
      if (typeof ResizeObserver !== 'undefined') {
        this._resizeObserver = new ResizeObserver(this._boundUpdateSticky);
        this._resizeObserver.observe(this);
      }
    }

    /**
     * Initializes event listeners for resize and HTMX swaps
     * @returns {void}
     */
    initEventListeners() {
      window.addEventListener('resize', this._boundUpdateSticky);
      document.body.addEventListener('htmx:after:swap', this._boundHandleHtmxSwap);
    }

    /**
     * Handles HTMX after:swap events
     * @param {CustomEvent} event - The HTMX after:swap event
     * @returns {void}
     */
    handleHtmxSwap(event) {
      const target = event.detail.ctx.target;
      if (target && (this.contains(target) || target === this)) {
        this.updateStickyBehavior();
      }
    }

    /**
     * Cleans up event listeners and observers
     * @returns {void}
     */
    cleanup() {
      window.removeEventListener('resize', this._boundUpdateSticky);
      document.body.removeEventListener('htmx:after:swap', this._boundHandleHtmxSwap);
      if (this._resizeObserver) {
        this._resizeObserver.disconnect();
        this._resizeObserver = null;
      }
    }
  }
  customElements.define('sticky-container', StickyContainer);
}
