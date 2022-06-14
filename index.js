const {parse}=require('csv-parse')
const fs=require('fs')
let isHabitablePlanet=[]
function isHabitable(planet){
    return planet['koi_disposition']==='CONFIRMED' && planet['koi_insol']>0.36 && planet['koi_insol']<1.11 && planet['koi_prad']<1.6
}
fs.createReadStream('kepler_data.csv').pipe(parse({
    comment:'#',
    columns:true
})).on('data', (data)=>{
    if(isHabitable(data)){
        isHabitablePlanet.push(data)
    }
}).on('end',() =>{
    console.log(`${isHabitablePlanet.length} is the amount of habitable planets that where found`)
    console.log(isHabitablePlanet.map((planet)=>{
        return planet['kepler_name']
    }))
    console.log('Done')
})