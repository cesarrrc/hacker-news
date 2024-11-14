const changeSelectWidth = (listOfSelects) => {
  listOfSelects.forEach((select) => {
    const selectedText = select.options[select.selectedIndex].text.split("");
    select.style.width = 16 + selectedText.length * 9 + "px";
  });
};
export default changeSelectWidth;
