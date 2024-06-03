export class TypeBot {
  url;
  flow;
  constructor (config) {
    this.url = config.url;
    this.flow = config.flow;
  }
  async createSession () {
    return fetch(`${this.url}/${this.flow}/startChat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.error(err));
  }
}