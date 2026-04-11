import { IsInt, IsPositive } from "class-validator";

export class CreateYearPensumDto {

    @IsInt()
    @IsPositive()
    year: number;
}
