function filter() {
  var filters = {
    text: filterText,
    sex: filterSex,
    age: filterAge,
  };

  var finalArr = data;
  for (var prop in filters) {
    finalArr = filters[prop](finalArr)
  }

  return finalArr;
}