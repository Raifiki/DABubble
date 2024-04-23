// import classes
import { Reaction } from './reaction.class';
import { User } from './user.class';

export class DirektMessage {
  creator!: User;
  date!: Date;
  content: string = '';
  reactions: Reaction[] = [];
  files: any[] = [];
}
