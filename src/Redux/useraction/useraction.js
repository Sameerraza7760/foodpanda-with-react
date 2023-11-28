export function setCity(City) {
  console.log("cityHere==>", City);
  return {
    type: "setCity",
    data: City,
  };
}

export function ResturentData(resturentData) {
  console.log("resturentData inside action", resturentData);
  return {
    type: "resturent_inform",
    data: resturentData,
  };
}
