if (!customElements.get('minicart-drawer')) {
  /**
   * MinicartDrawer Web Component
   * 
   * A custom element that manages the minicart drawer functionality including
   * opening/closing the drawer, updating total items count, and handling
   * HTMX interactions for cart updates.
   * 
   * @class MinicartDrawer
   * @extends HTMLElement
   * 
   * @fires open-minicart - Custom event to open the minicart drawer
   * @listens open-minicart - Window event to handle opening the drawer
   * @listens change - Drawer toggle checkbox change event
   */
  class MinicartDrawer extends HTMLElement {
    constructor() {
      super();
      /** @private {boolean} Internal open state */
      this._open = false;
      /** @private {HTMLInputElement|null} Reference to the drawer toggle checkbox */
      this.drawerToggle = null;
      /** @private {Function} Bound reference to handleToggleChange for proper cleanup */
      this.handleToggleChange = this.handleToggleChange.bind(this);
      /** @private {Function} Bound reference to handleOpenMinicart for proper cleanup */
      this.handleOpenMinicart = this.handleOpenMinicart.bind(this);
      /** @private {Function} Bound reference to handleStorage for proper cleanup */
      this.handleStorage = this.handleStorage.bind(this);
      /** @private {Function} Bound reference to handleVisibilityChange for proper cleanup */
      this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    /**
     * Gets the current open state of the drawer
     * @returns {boolean} True if the drawer is open, false otherwise
     */
    get open() {
      return this._open;
    }

    /**
     * Sets the open state of the drawer and triggers appropriate actions
     * DaisyUI CSS drives visibility via :checked — only the checkbox needs to change.
     * @param {boolean} value - The new open state
     */
    set open(value) {
      const newValue = Boolean(value);

      if (this._open === newValue) return;

      this._open = newValue;

      if (this.drawerToggle && this.drawerToggle.checked !== this._open) {
        this.drawerToggle.checked = this._open;
      }

      if (this._open) {
        this.triggerRequestMinicart();
      }
    }

    /**
     * Called when the element is connected to the DOM
     * Sets up event listeners and initializes the component
     */
    connectedCallback() {
      this.updateMinicartTotalItems();
      this._setupEventListeners();

      if (localStorage.getItem("li_should_update_minicart")) {
        setTimeout(() => {
          this.refreshMinicartTotalItems(true);
          localStorage.removeItem("li_should_update_minicart");
        }, 3000);
      } else {
        document.querySelector('[data-id="minicart-summary"]')
          ?.addEventListener('htmx:after:init', () => this.refreshMinicartTotalItems(), { once: true });
      }
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
      this.drawerToggle = document.querySelector('#header-minicart-drawer-toggle');
      if (this.drawerToggle)
        this.drawerToggle.addEventListener('change', this.handleToggleChange);
      window.addEventListener('open-minicart', this.handleOpenMinicart);
      window.addEventListener('storage', this.handleStorage);
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }

    /**
     * Removes all event listeners
     * @private
     */
    _cleanupEventListeners() {
      if (this.drawerToggle)
        this.drawerToggle.removeEventListener('change', this.handleToggleChange);
      window.removeEventListener('open-minicart', this.handleOpenMinicart);
      window.removeEventListener('storage', this.handleStorage);
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }

    /**
     * Handles the drawer toggle checkbox change event
     * @param {Event} event - The change event from the checkbox
     */
    handleToggleChange(event) {
      this.open = event.target.checked;
    }

    /**
     * Handles the custom 'open-minicart' window event
     * Opens the minicart drawer
     */
    handleOpenMinicart() {
      this.open = true;
    }

    /**
     * Handles localStorage changes made by other browser windows
     * Re-renders the total items when the count changes
     * @param {StorageEvent} event - The storage event
     */
    handleStorage(event) {
      if (event.key === "li-minicart-total-items") this.updateMinicartTotalItems();
    }

    /**
     * Handles the document visibility change
     * Refreshes the total items when the page becomes visible again
     */
    handleVisibilityChange() {
      if (document.visibilityState === 'visible') this.refreshMinicartTotalItems();
    }

    /**
     * Updates the minicart total items display
     * Retrieves the count from parameter, localStorage, or defaults to 0
     *
     * @param {number} [quantity] - Optional quantity to set directly
     */
    updateMinicartTotalItems(quantity) {
      if (quantity != null) {
        localStorage.setItem("li-minicart-total-items", quantity);
        localStorage.setItem("li-minicart-total-items-at", Date.now());
      }
      const totalItems = quantity ?? localStorage.getItem("li-minicart-total-items") ?? 0;
      const totalItemsElements = document.querySelectorAll('[data-id="minicart-totalitems"]');
      totalItemsElements.forEach(element => {
        element.textContent = String(totalItems);
      });
    }

    /**
     * Triggers an HTMX request to the cart summary when the stored total items is older than 5 minutes
     * Uses the summary route, which does not fire view_cart
     * Skips visitors that never had a cart response, unless forced
     *
     * @param {boolean} [force=false] - Requests regardless of the stored count and its age
     */
    refreshMinicartTotalItems(force = false) {
      const summary = document.querySelector('[data-id="minicart-summary"]');
      if (!summary || summary.classList.contains('htmx-request')) return;

      if (!force) {
        if (localStorage.getItem("li-minicart-total-items") == null) return;
        const updatedAt = Number(localStorage.getItem("li-minicart-total-items-at"));
        if (Date.now() - updatedAt < 5 * 60 * 1000) return;
      }

      htmx.trigger(summary, 'li-minicart-summary');
    }

    /**
     * Triggers an HTMX request to update the minicart
     */
    triggerRequestMinicart() {
      const minicartElements = document.querySelectorAll('[hx-trigger*="li-minicart-opened"]');
      minicartElements.forEach((minicartElement) => {
        if (!minicartElement.classList.contains('htmx-request')) {
          htmx.trigger(minicartElement, 'li-minicart-opened');
        }
      });
    }
  }
  customElements.define('minicart-drawer', MinicartDrawer);
}
