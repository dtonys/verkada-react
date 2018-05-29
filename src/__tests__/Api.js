import superagent from 'superagent';


describe('API', () => {

  test('GET `https://jsonplaceholder.typicode.com/posts?_limit=5` returns correct data', async () => {
    const response = await superagent.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const firstItem = {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    };
    expect(response.body[0]).toEqual(firstItem);
  });

});
