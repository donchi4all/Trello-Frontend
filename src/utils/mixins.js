export default {
  methods: {
    onError(error) {
      if (error.response) error = error.response;
      alert(
        error.data
          ? error.data.message ||
              "Something went wrong. Please try again or contact system administrator."
          : error.message ||
              "Something went wrong. Please try again or contact system administrator."
      );
      // only log in dev
      if (typeof webpackHotUpdate !== "undefined") {
        console.error(error);
      }
    },

    disableButtons(event = null) {
      // Disable submission form/event
      let buttons = [];
      if (event) {
        // eslint-disable-next-line no-undef
        let itemText = $(event).text();
        buttons.push({ item: event.target, itemText: itemText });
        event.target.classList.add("btn-disabled", "btn-loading", "btn-icon");
        // eslint-disable-next-line no-undef
        if (itemText) $(btn).text("Please wait...");
        event.target.disabled = true;
      } else {
        // Disable submission button
        let btn = document.getElementsByClassName("form-btn");
        if (btn) {
          btn.forEach((btn) => {
            // console.log([btn, $(btn).text(), btn.classList])
            // eslint-disable-next-line no-undef
            let itemText = $(btn).text();
            buttons.push({ item: btn, itemText: itemText });
            btn.classList.add("btn-disabled", "btn-loading", "btn-icon");
            // eslint-disable-next-line no-undef
            if (itemText) $(btn).text("Please wait...");
            btn.disabled = true;
          });
        }
      }

      return buttons;
    },

    enableButtons(buttons) {
      if (Array.isArray(buttons)) {
        buttons.forEach((button) => {
          button.item.classList.remove(
            "btn-disabled",
            "btn-loading",
            "btn-icon"
          );
          // eslint-disable-next-line no-undef
          if (button.itemText) $(button.item).text(button.itemText);
          button.item.disabled = false;
        });
      } else if (typeof buttons === "string") {
        buttons.item.classList.remove(
          "btn-disabled",
          "btn-loading",
          "btn-icon"
        );
        // eslint-disable-next-line no-undef
        if (button.itemText) $(buttons.item).text(buttons.itemText);
        // eslint-disable-next-line no-undef
        button.item.disabled = false;
      }
    },

    disableBtn(id) {
      let btn = document.getElementById(id);
      btn.disabled = true;
      btn.innerHTML = "loading ....";
    },
    enableBtn(id, name = "submit") {
      let btn = document.getElementById(id);
      btn.removeAttribute("disabled");
      btn.innerHTML = name;
    },
  },
};
