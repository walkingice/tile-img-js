import { Dummy } from './dummy/Dummy'

test('Verify dummy strings', () => {
    const dummy: Dummy = new Dummy()
    console.log(dummy.greeting)
    // Assert
    expect(dummy.greeting).toBe("Dummy class");
});