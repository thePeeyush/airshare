export const readChunk = async (file: File, sendChunk: Function) => {
  const stream = file.stream();
  const reader = stream.getReader();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      sendChunk(value);
    }
  } catch (error) {
    console.log(error);
  } finally {
    await reader.closed;
  }
};