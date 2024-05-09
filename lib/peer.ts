import getIceServer from "@/lib/getIceServer";
import Peer, {DataConnection,} from "airsharejs";

export enum DataType {
    FILE = 'FILE',
    OTHER = 'OTHER'

}
export interface Data {
    id:number
    dataType: DataType
    file?: Blob
    fileName?: string
    fileType?: string
    message?: string
}


export interface Pre {
    id:number
    filename:string
    filesize:number
}

let peer: Peer | undefined
let connectionMap: Map<string, DataConnection> = new Map<string, DataConnection>()

export const PeerConnection = {
    getPeer: () => peer,
    startPeerSession: () => new Promise<string>(async(resolve, reject) => {
        try {
            const iceServers = await getIceServer()            
            peer = new Peer({
                // config:{
                //     iceServers:iceServers
                // }
            })
            peer.on('open', (id) => {
                resolve(id)
                console.log('My ID: ' + id)
            }).on('error', (err) => {
                console.log(err)
            })
        } catch (err) {
            console.log(err)
            reject(err)
        }
    }),
    closePeerSession: () => new Promise<void>((resolve, reject) => {
        try {
            if (peer) {
                peer.destroy()
                peer = undefined
            }
            resolve()
        } catch (err) {
            console.log(err)
            reject(err)
        }
    }),
    connectPeer: (id: string) => new Promise<void>((resolve, reject) => {
        if (!peer) {
            reject(new Error("Peer doesn't start yet"))
            return
        }
        if (connectionMap.has(id)) {
            reject(new Error("Connection existed"))
            return
        }
        try {
            let conn = peer.connect(id, {reliable: true})
            if (!conn) {
                reject(new Error("Connection can't be established"))
            } else {
                conn.on('open', function() {
                    console.log("Connect to: " + id)
                    connectionMap.set(id, conn)
                    resolve()
                }).on('error', function(err) {
                    console.log(err)
                    reject(err)
                })
            }
        } catch (err) {
            reject(err)
        }
    }),
    onIncomingConnection: (callback: (conn: DataConnection) => void) => {
        peer?.on('connection', function (conn) {
            console.log("Incoming connection: " + conn.peer)
            connectionMap.set(conn.peer, conn)
            callback(conn)
        });
    },
    onConnectionDisconnected: (id: string, callback: () => void) => {
        if (!peer) {
            throw new Error("Peer doesn't start yet")
        }
        if (!connectionMap.has(id)) {
            throw new Error("Connection didn't exist")
        }
        let conn = connectionMap.get(id);
        if (conn) {
            conn.on('close', function () {
                console.log("Connection closed: " + id)
                connectionMap.delete(id)
                callback()
            });
        }
    },
    sendConnection: (id: string, data: Data|Pre): Promise<void> => new Promise((resolve, reject) => {
        if (!connectionMap.has(id)) {
            reject(new Error("Connection didn't exist"))
        }
        try {
            let conn = connectionMap.get(id);
            if (conn) {
                conn.send(data)
            }
        } catch (err) {
            reject(err)
        }
        resolve()
    }),

    onConnectionReceiveData:<T extends (Data|Pre)>(id: string, callback: (f: T) => void) => {
        if (!peer) {
            throw new Error("Peer doesn't start yet")
        }
        if (!connectionMap.has(id)) {
            throw new Error("Connection didn't exist")
        }
        let conn = connectionMap.get(id)
        let dataSize = 0
        if (conn) {
            conn.on('data', function (receivedData) {
                console.log(receivedData);
                console.log("Receiving data from " + id)
                let data = receivedData as T
                callback(data)
            })
        }
    }

}