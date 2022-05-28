const calculateOutcome = require('./script.js');

describe('calculateOutCome (rock)', () => {
    test('rock vs rock', () => {
        expect(calculateOutcome('rock', 'rock'))
            .toEqual('draw');
    });
    test('rock vs scissors', () => {
        expect(calculateOutcome('rock', 'scissors'))
            .toEqual('win');
    });
    test('rock vs rock', () => {
        expect(calculateOutcome('rock', 'paper'))
            .toEqual('lose');
    });
})

describe('calculateOutCome (paper)', () => {
    test('rock vs rock', () => {
        expect(calculateOutcome('paper', 'rock'))
            .toEqual('win');
    });
    test('rock vs scissors', () => {
        expect(calculateOutcome('paper', 'scissors'))
            .toEqual('lose');
    });
    test('rock vs rock', () => {
        expect(calculateOutcome('paper', 'paper'))
            .toEqual('draw');
    });
})

describe('calculateOutCome (scissors)', () => {
    test('rock vs rock', () => {
        expect(calculateOutcome('scissors', 'rock'))
            .toEqual('lose');
    });
    test('rock vs scissors', () => {
        expect(calculateOutcome('scissors', 'scissors'))
            .toEqual('draw');
    });
    test('rock vs rock', () => {
        expect(calculateOutcome('scissors', 'paper'))
            .toEqual('win');
    });
})