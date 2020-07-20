export const selectText = {
  inserted(el) {
    const input = el.querySelector(".q-field__native");
    input.addEventListener("focus", () => {
      console.log("on focus", input.value.length);
      if (input.value.length) input.select();
    });
  }
};
