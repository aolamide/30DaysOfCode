const intersectionEye = (arr1, arr2) => arr1.filter(ele => arr2.includes(ele));

console.log(intersectionEye(['a', 'b', 'c'],['d', 'b', 'b', 'a']));