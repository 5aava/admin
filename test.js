const util = require('util');


const datas = [
  { checked: true, trackId: 4, year: 2023, q: 1 },
  { checked: true, trackId: 4, year: 2024, q: 2 },
  { checked: true, trackId: 4, year: 2024, q: 4 },
  { checked: true, trackId: 1, year: 2024, q: 3 },
  { checked: true, trackId: 1, year: 2024, q: 3 },
  { checked: true, trackId: 1, year: 2024, q: 3 },
  { checked: true, trackId: 1, year: 2024, q: 3 },
  { checked: true, trackId: 1, year: 2024, q: 3 },
  { checked: true, trackId: 1, year: 2023, q: 4 }
]

const obj = getRequestObj(datas);
console.log(util.inspect(obj, false, null, true /* enable colors */));

function getRequestObj(datas){
  // console.log(m)
  const tracks = [];

  // add tracks
  datas.forEach(i => {
    // check for double
    const result = tracks.find(o => {
      if( o?.trackId === i.trackId){
        return o;
      }
    });

    if(!result){
      tracks.push({
        trackId: i.trackId,
        years: []
      })
    }

  }) 

  // add  years
  tracks.forEach(track => {
    datas.forEach(data => {
      if(data.trackId == track.trackId){

        // check for double
        const r = track.years.find(o => {
          if( o?.year === data.year){
            return o;
          }
        });
      
        if(!r){
          track.years.push({
            year: data.year,
            quarters: []
          })
        }
      }
    })
  })

  // add quarters
  tracks.forEach(track => {
    track.years.forEach(year => {
      datas.forEach(data => {
        if(data.trackId == track.trackId && data.year == year.year){

          // check for double
          const found = year.quarters.find((e) => e === data.q);
          if(!found){
            year.quarters.push(data.q);
          }
        
        }
      })

    })
  });

  return tracks;
}
