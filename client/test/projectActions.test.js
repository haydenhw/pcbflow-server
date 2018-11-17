const projects = [{
  name: 'fred',
  _id: '1234',
},
{
  name: 'mac',
  _id: '456',
}]

const url = 'http://localhost:3000/#/design/5bef9bef6472530cf4f5d1b6'


const res = isDesignRoute(url);
console.log(res);

test('adds 1 + 2 to equal 3', () => {
  expect(res).toBe(true);
});
