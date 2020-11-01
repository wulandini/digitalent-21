import { Client } from 'elasticsearch';

const client = new Client({
  host: process.env.ELASTICSEARCH_HOST
});

const index = 'account'

export class ElasticClient {
  private client: Client;
  private index : string; 

  constructor() {
    this.client = client;
    this.index = string;
  }

  async getData(size?: number) {
    let result
    try{
      result = await client.search({
        index: 'account'
        size: size ? size : 10,
      })
    }catch(error){
      throw error;
    }

    return result;
  }

  async getByState(state: string) {
    let result
    try{
      result = await client.search({
        index: 'account',
        body: {
          query: {
            match: {
              state
            }
          }
        }
      });
    } catch (error) {
      throw error;
    }

    return result;
  }

  async getByEmployer(state: string, employer: string) {
    let result
    try{
      result = await client.search({
        index: 'account',
        body: {
          query: {
            bool: {
              must: [
                {
                  match: {
                    state,
                  }
                },
              ]
                  match: {
                    employer
               }
            }
           }
         }
        }
      } 
     })
    } catch (error){
      throw error;
    }

    return result;
  }

  async getByAccountNumber(accountNumber: number) {
    let result;
    try {
      result = await client.search({
        index = 'account';
        body = {
          query = {
            term = {
              account_number =
              }
            }
          }
        }
      })
    } catch (error){
      throw error;
    }

    return result;
  }

  async getByAccountNumberRange(accountNumbers: number[]) {
    let result;
    const [acc1, acc2] = accountNumbers;
    try {
      result = await client.search({
        index: 'account'
        body: {
          query: {
            range: {
              account_number: {
                gle: acc1
                lte: acc2
              }
            }
          }
        }
      })
    } catch (error){
      throw error;
    }
    return result;
  }

  async getByAge(age: number) {
    let result;
    try {
      result = await client.search({
        index: 'account'
        body: {
          query: {
            range: {
              gle: age
            }
          }
        }
      })
    } catch (error){
      throw error;
    }
    return result:
  }
}