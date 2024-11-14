const changeSelectWidth = (listOfSelects) => {
  listOfSelects.forEach((select) => {
    const selectedText = select.options[select.selectedIndex].text.split("");
    select.style.width = 20 + selectedText.length * 9.5 + "px";
  });
};
export default changeSelectWidth;
