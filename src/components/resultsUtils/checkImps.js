function checkImps(diff) {
  const absDiff = Math.abs(diff);
  const impsTable = [20,40,80,120,160,210,260,310,360,420,490,590,740,890,1090,1290,1490,1740,1990,2240,2490,2990,3490,3990]
  for(let i=0; i < impsTable.length; i++)
    if(absDiff < impsTable[i])
      return i;
  return impsTable.length;
}

export default checkImps;
