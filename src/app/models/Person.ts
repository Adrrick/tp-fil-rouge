
export interface Person{
  adult: boolean;
  gender?: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
}

export interface CastPerson extends Person {
  cast_id: number;
  character: string;
  credit_id: string;
  order: string;
}

export interface CrewPerson extends Person {
  credit_id: string;
  department: string;
  job: string;
}