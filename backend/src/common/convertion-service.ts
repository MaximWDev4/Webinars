// import { Convert, Converter } from '@fabio.formosa/metamorphosis';
// import { Connection, Repository } from 'typeorm';
// import { UserDto } from '../users/dto/user.dto';
// import { User } from '../users/user.entity';
// import { Injectable } from '@nestjs/common';
//
// @Injectable()
// @Convert(UserDto, User)
// export default class CableDtoToCableConverter implements Converter<UserDto, Promise<User>> {
//
//   constructor(private readonly connection: Connection) {
//   }
//
//   public async convert(source: UserDto): Promise<User> {
//     const userRepository: Repository<User> = this.connection.getRepository(User);
//     const target: Product | undefined = await userRepository.findOne({ email: source.email});
//     if (!target)
//       throw new Error(`not found any cable by id ${source.email}`);
//     target.CAB_Length = source.length;
//     target.CAB_Quantity = source.quantity;
//     return target;
//   }
// }
