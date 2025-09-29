/** 
 * Calculate the value for asp_mixing column 
 * @param tipWashing - Retreive from user input (Yes or No)
 * */
export const getAspMixing = (tipWashing) => {
  return tipWashing.trim().startsWith("Yes") ? 3 : 0;
}
