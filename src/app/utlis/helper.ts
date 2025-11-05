import moment from "moment";

export const capitalizeFirstLetter =(str) =>{
    if (typeof str !== 'string' || !str.length) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
 export const dateFormater = (value) => {
    try {
      if (moment(value).isValid()) {
        const formatStr = "MMM DD, YYYY";
        return moment(value).format(formatStr);
      }
      return value;
    } catch {
      return value;
    }
  };
