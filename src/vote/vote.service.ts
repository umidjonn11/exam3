import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVoteInput } from './dto/create-vote.input';
import { UpdateVoteInput } from './dto/update-vote.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.model';
import { UserEntity } from 'src/user/entities/user.entity';
import { Poll } from 'src/poll/entities/poll.entity';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote) private VoteRepository: Repository<Vote>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,

    @InjectRepository(Poll)
    private pollRepo: Repository<Poll>,
  ) {}
  async create(createVoteInput: CreateVoteInput) {
    const { userId, pollId, selectedOption } = createVoteInput;

    const poll = await this.pollRepo.findOneBy({ id: pollId });
    if (!poll) throw new Error('Poll topilmadi');

    if (!poll.isActive) throw new BadRequestException('Poll active emas ');

    if (!poll.options.includes(selectedOption)) {
      throw new BadRequestException('Mavjud bulmagan option tanlandi');
    }

    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new Error('User topilmadi');

    const existingVote = await this.VoteRepository.findOne({ where: { user: { id: userId }, poll: { id: pollId } } });
    if (existingVote) {
      throw new BadRequestException('User faqat bir marta javob berishi mumkin');
    }


    const vote = this.VoteRepository.create({
      user,
      poll,
      selectedOption,
    });

    return await this.VoteRepository.save(vote);
  }

  findAll() {
    return;
  }

  findOne(id: number) {
    return `This action returns a #${id} vote`;
  }

  update(id: number, updateVoteInput: UpdateVoteInput) {
    return `This action updates a #${id} vote`;
  }

  remove(id: number) {
    return `This action removes a #${id} vote`;
  }
}
