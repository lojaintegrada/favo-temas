if (!customElements.get('bottom-sheet-dialog')) {
  /**
   * BottomSheetDialog Web Component
   * 
   * A custom element that manages a bottom sheet dialog with overlay.
   * Supports opening/closing via the `active` class and handles
   * click events on elements with the `.bottom-sheet-close` class.
   * 
   * @class BottomSheetDialog
   * @extends HTMLElement
   * 
   * @example
   * <bottom-sheet-dialog class="bottom-sheet active">
   *   <div class="bottom-sheet-overlay bottom-sheet-close"></div>
   *   <div class="bottom-sheet-content">...</div>
   * </bottom-sheet-dialog>
   */
  class BottomSheetDialog extends HTMLElement {
    constructor() {
      super();
      /** @private {boolean} Internal active state */
      this._active = false;
      /** @private {NodeListOf<Element>|null} Reference to close trigger elements */
      this.closeElements = null;
      /** @private {Function} Bound reference to handleClose for proper cleanup */
      this.handleClose = this.handleClose.bind(this);
    }

    /**
     * Gets the current active state of the bottom sheet
     * @returns {boolean} True if the bottom sheet is active, false otherwise
     */
    get active() {
      return this._active;
    }

    /**
     * Sets the active state of the bottom sheet
     * @param {boolean} value - The new active state
     */
    set active(value) {
      const newValue = Boolean(value);

      if (this._active === newValue) return;

      this._active = newValue;

      if (this._active) {
        this.classList.add('active');
      } else {
        this.classList.remove('active');
      }
    }

    /**
     * Called when the element is connected to the DOM
     * Sets up event listeners and initializes the component
     */
    connectedCallback() {
      this._active = this.classList.contains('active');
      this._setupEventListeners();
    }

    /**
     * Called when the element is disconnected from the DOM
     * Cleans up event listeners to prevent memory leaks
     */
    disconnectedCallback() {
      this._cleanupEventListeners();
    }

    /**
     * Sets up all necessary event listeners
     * @private
     */
    _setupEventListeners() {
      this.closeElements = this.querySelectorAll('.bottom-sheet-close');
      this.closeElements.forEach((el) => {
        el.addEventListener('click', this.handleClose);
      });
    }

    /**
     * Removes all event listeners
     * @private
     */
    _cleanupEventListeners() {
      if (this.closeElements) {
        this.closeElements.forEach((el) => {
          el.removeEventListener('click', this.handleClose);
        });
      }
    }

    /**
     * Handles click events on close elements
     * @param {Event} event - The click event
     */
    handleClose(event) {
      this.close();
    }

    /**
     * Opens the bottom sheet dialog
     */
    open() {
      this.active = true;
    }

    /**
     * Closes the bottom sheet dialog
     */
    close() {
      this.active = false;
    }

    /**
     * Toggles the bottom sheet dialog state
     */
    toggle() {
      this.active = !this._active;
    }
  }

  customElements.define('bottom-sheet-dialog', BottomSheetDialog);
}
