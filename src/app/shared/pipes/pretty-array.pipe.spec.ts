import { PrettyArrayPipe } from './pretty-array.pipe';

describe('PrettyArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new PrettyArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
