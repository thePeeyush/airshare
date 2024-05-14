import { create } from "zustand";

const useShared = create<Shared>()((set) => ({
  count: 0,
  SharedFiles: [],
  setCount: () => set((s) => ({ count: s.count + 1 })),
  setList: (file) => set((s) => ({ SharedFiles: [file, ...s.SharedFiles] })),
  setStatus: (id, newStatus) =>
    set((s) => {
      return {
        SharedFiles: s.SharedFiles.map((file) =>
          file.id === id ? { ...file, status: newStatus } : file
        ),
      };
    }),
    setProgress: (id, newProgress) =>
      set((s) => {
        return {
          SharedFiles: s.SharedFiles.map((file) =>
            file.id === id ? { ...file, progress: newProgress } : file
          ),
        };
      }),
  reset:()=>(set({count:0,SharedFiles:[]}))
}));

const useSelected = create<Selected>()((set)=>({
  SelectedFiles: [],
  setList: (file) => set((s) => ({ SelectedFiles: [file, ...s.SelectedFiles] })),
  reset:()=>(set({SelectedFiles:[]}))

}))




export { useShared , useSelected}
