import type { Answer, Result, Sources } from './app.contract.d.ts';

export const grants = '';

const sources: Sources = {
  greeting: async ([name], _store, storage): Promise<Result<'greeting'>> => {
    await storage.fs.readFile('app:/data/launch').catch((e) => { if (e.code === 'bake') throw e; });
    return { text: `Hello from ${name}.` };
  },
};
export const answer: Answer = (source, args, store, storage, native) =>
  sources[source](args, store, storage, native);
