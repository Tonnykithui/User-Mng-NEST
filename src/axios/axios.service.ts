import { HttpException, Injectable } from '@nestjs/common';
import { CreateAxioDto } from './dto/create-axio.dto';
import { UpdateAxioDto } from './dto/update-axio.dto';
import * as Axios from 'axios';


@Injectable()
export class AxiosService {
  create(createAxioDto: CreateAxioDto) {
    return 'This action adds a new axio';
  }

  async findAll() {
    try{
      const results = await Axios.default.get('https://jsonplaceholder.typicode.com/posts')
                      .then(response => {return response.data })
                      .catch(e => {
                        console.log(e.Message);
                        throw new HttpException(e.Message,e.status);
                      })
      return results;
    }
    catch(e){
      throw e;
    }
  }

  async findOne(id: number) {
    try{
      const results = await Axios.default.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
                      .then(response => { return response.data })
                      .catch(e => {
                        console.log(e.Message);
                        throw new HttpException(e.Message, e.status);
                      });
      return results;
    } catch(e){
      throw e;
    }
  }

  update(id: number, updateAxioDto: UpdateAxioDto) {
    return `This action updates a #${id} axio`;
  }

  remove(id: number) {
    return `This action removes a #${id} axio`;
  }
}
