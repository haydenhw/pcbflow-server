const projects = [{
  name: 'fred',
  _id: '1234',
},
{
  name: 'mac',
  _id: '456',
}]


const res = getProjectById(projects, '1234');

test('adds 1 + 2 to equal 3', () => {
  expect(res.name).toBe('fred');
});
