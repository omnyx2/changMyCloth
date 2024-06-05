function fileNameIndex(gender, season, style) {
    let indexString = "";
    console.log(gender, season, style)
    if(gender === 'male') indexString += '1';
    if(gender === 'female')  indexString += '2';
    if (season === 'spring') indexString += '1';
    if (season === 'summer') indexString += '2' ;
    if (season === 'fall') indexString += '3' 
    if (season === 'winter') indexString += '4'; 
    if (style === 'formal') indexString += '2';
    if (style === 'casual') indexString += '1';
  
    return indexString
}

export default fileNameIndex;