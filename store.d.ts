//----------------Connections------------------------------------------------------------------------------------------------------------------------------------

interface Connection {
  isConnected: boolean;
  reciver: boolean;
  sender: boolean;
  startSession: boolean;

  setIsConnected: (bool: boolean) => void;
  setReciever: (bool: boolean) => void;
  setSender: (bool: boolean) => void;
  setStartSession: (bool: boolean) => void;
  reset: () => void;
}

//----------------files------------------------------------------------------------------------------------------------------------------------------------


type SharedFile = {
  id: number;
  name: string;
  size: number;
  progress: number;
  status: boolean;
  type: string;
  sendByMe?: boolean;
};

interface files extends Array<SharedFile> {}

type SharedFiles = files
interface Shared {
  count: number;
  SharedFiles: files;
  setCount: () => void;
  setList: (file: SharedFile) => void;
  setStatus: (id: number, newStatus: boolean) => void;
  setProgress: (id: number, newProgress: number) => void;
  reset: () => void;
}


interface SelectedFiles extends Array<File> {}

interface Selected {
  SelectedFiles: SelectedFiles;
  setList: (file: File) => void;
  reset: () => void;
}

//----------------Peer------------------------------------------------------------------------------------------------------------------------------------


interface Peer {
  peerID: string;
  myID: string;
  setPeerID: (ID: string) => void;
  setMyID: (ID: string) => void;
  reset: () => void;
}
