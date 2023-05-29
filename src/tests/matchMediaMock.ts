export const mathcMediaMock = (cb: () => unknown) => {
	return {
		writable: true,
		value: jest.fn().mockImplementation(cb)
	}
}