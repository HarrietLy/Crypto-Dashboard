const generatePolylinePoints =(dataArray, width, height)=>{
    let transformedData=[]
    const dataLen = dataArray.length
    const range = Math.max(...dataArray)-Math.min(...dataArray)
    for (let i=0; i<dataLen;i++){
        let x=width/dataLen *(i)
        let y=height/range*(Math.max(...dataArray)-dataArray[i])
        transformedData.push(x+','+y)
    }
    return transformedData.join(' ')
}

export default generatePolylinePoints