export const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
  
    return remainingDays.toFixed(0);
  };
  
  export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);
  
    return percentage;
  };
  
  export const checkIfImage = (url, callback) => {
    const img = new Image();       //image naam ka element bana dega
    img.src = url;
  
    if (img.complete) callback(true);       // agar url successfully img me store ho gya to true
  
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
  };

//   utility that we will use often, provided by js mastery
//it has simple logics that we will use often