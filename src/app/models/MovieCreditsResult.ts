import {CastPerson, CrewPerson} from "./Person";

export default interface MovieCreditsResult {
  id: number;
  cast: CastPerson[];
  crew: CrewPerson[];
}