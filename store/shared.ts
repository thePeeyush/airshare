import { create } from "zustand";

type File = {
  id: number;
  name: string;
  size: number;
  status: boolean;
};

interface files extends Array<File> {}

interface Shared {
  count: number;
  list: files;
  setCount: () => void;
  setList: (file: File) => void;
  setStatus: (id: number, newStatus: boolean) => void;
  reset: () => void;
}

const useShared = create<Shared>()((set) => ({
  count: 0,
  list: [],
  setCount: () => set((s) => ({ count: s.count + 1 })),
  setList: (file) => set((s) => ({ list: [file, ...s.list] })),
  setStatus: (id, newStatus) =>
    set((s) => {
      return {
        list: s.list.map((file) =>
          file.id === id ? { ...file, status: newStatus } : file
        ),
      };
    }),
  reset:()=>(set({count:0,list:[]}))
}));

export default useShared;
