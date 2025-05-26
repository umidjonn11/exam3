import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePollInput } from './dto/create-poll.input';
import { UpdatePollInput } from './dto/update-poll.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { Repository } from 'typeorm';
import { Vote } from 'src/vote/entities/vote.entity';
import { PollResult } from './entities/result.response';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(Poll) private pollRepo: Repository<Poll>,
    @InjectRepository(Vote) private voteRepository: Repository<Vote>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}
  async create(createPollInput: CreatePollInput) {
    const { userId, question, options } = createPollInput;
    const createdBy = await this.userRepo.findOneBy({ id: userId });
    if (!createdBy) throw new Error('User topilmadi');
    if(createdBy.role==="user") throw new Error ("Faqat admin poll create qilishi mumkin! ")
    const poll = this.pollRepo.create({
      createdBy,
      question,
      options,
    });
    return await this.pollRepo.save(poll);
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

  async getPollResults(pollId: string): Promise<PollResult[]> {
    const poll = await this.pollRepo.findOne({ where: { id: pollId } });
    if (!poll) throw new NotFoundException('Poll topilmadi');

    const votes = await this.voteRepository.find({
      where: { poll: { id: pollId } },
    });

    const counts: Record<string, number> = {};

    votes.forEach((vote) => {
      counts[vote.selectedOption] = (counts[vote.selectedOption] || 0) + 1;
    });

    const totalVotes = votes.length;

    const results: PollResult[] = (poll.options || []).map((option: string) => {
      const count = counts[option] || 0;
      const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
      return {
        option,
        count,
        percentage: +percentage.toFixed(2),
      };
    });

    return results;
  }
}
