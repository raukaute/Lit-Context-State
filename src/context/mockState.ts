import { makeReactive } from './reactivity/makeReactive';
// import { reactive } from './vreact/reactivity.global.js';

const state = makeReactive({
  tester: 'Test Value',
  testArray: ['Test', 'this', 'shit'],
  testObject: {
    deepTest: 1,
  },
});

export default state;
