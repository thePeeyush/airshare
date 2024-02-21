import { create } from "zustand";

type File = {
  id: number;
  name: string;
  size: number;
  status: boolean;
};

interface files extends Array<File> {}

interface List {
  count: number;
  list: files;
  setCount: () => void;
  setList: (file: File) => void;
  setStatus: (id: number, newStatus: boolean) => void;
}

const useShared = create<List>()((set) => ({
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
}));

export default useShared;
