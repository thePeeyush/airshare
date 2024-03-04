'use server'
type IceServers = {
  urls: string;
  username?: string;
  credential?: string;
}[];


const getIceServer = async() => {

    let iceServers:IceServers = []
        
    await fetch(`https://airshare.metered.live/api/v1/turn/credentials?apiKey=${process.env.METERED_KEY}`)
    .then(async(response:Response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
         iceServers =  await response.json()    
      })
      .catch((error) => {
        console.error("Error fetching TURN server credentials:", error);
      });
      
      return iceServers
}

export default getIceServer