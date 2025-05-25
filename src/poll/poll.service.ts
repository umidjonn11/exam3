import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePollInput } from './dto/create-poll.input';
import { UpdatePollInput } from './dto/update-poll.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PollService {
  constructor(@InjectRepository(Poll) private pollRepo:Repository<Poll>){}
 async create(createPollInput: CreatePollInput) {
    const poll= this.pollRepo.create(createPollInput);
    await this.pollRepo.save(poll)
    return poll
  }

  findAll() {
    return `This action returns all poll`;
  }

  findOne(id: number) {
    return `This action returns a #${id} poll`;
  }

  
async getActivePolls() {
  return this.pollRepo.find({
    where: { isActive: true },
  });
}
async deactivatePoll(id: string): Promise<Poll> {
  const poll = await this.pollRepo.findOneBy({ id });
  if (!poll) throw new NotFoundException('Poll topilmadi');

  poll.isActive = false;
  return this.pollRepo.save(poll);
}


  update(id: number, updatePollInput: UpdatePollInput) {
    return `This action updates a #${id} poll`;
  }

  remove(id: any) {
    return this.pollRepo.delete(id);
  }
}
