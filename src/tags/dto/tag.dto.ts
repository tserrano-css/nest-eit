import { IsString, Length } from 'class-validator';

export class TagtDto {
  @IsString({
    message: 'El nombre se ha de indicar',
  })
  name: string;

  @IsString()
  @Length(10, 50)
  slug: string;
}
