import { award } from './tables/award/seed';
import { degreeProgramYearBase } from './tables/base/degree-program-year/seed';
import { universityMajorDisciplineTagBase } from './tables/base/university-major-discipline-tag/seed';
import { universityMajorBase } from './tables/base/university-major/seed';
import { categoryTagDisciplineTag } from './tables/category-tag-discipline-tag/seed';
import { categoryTag } from './tables/category-tag/seed';
import { country } from './tables/country/seed';
import { degreeProgram } from './tables/degree-program/seed';
import { degree } from './tables/degree/seed';
import { designation } from './tables/designation/seed';
import { disciplineTag } from './tables/discipline-tag/seed';
import { majorDisciplineTag } from './tables/major-discipline-tag/seed';
import { major } from './tables/major/seed';
import { programScholarship } from './tables/program-scholarship/seed';
import { programTypeInstance } from './tables/program-type-instance/seed';
import { programType } from './tables/program-type/seed';
import { program } from './tables/program/seed';
import { ranking } from './tables/ranking/seed';
import { scholarship } from './tables/scholarship/seed';
import { universityDesignation } from './tables/university-designation/seed';
import { university } from './tables/university/seed';

const seeds = [
  country,
  designation,
  university,
  universityDesignation,
  major,
  universityMajorBase,
  award,
  degree,
  programType,
  programTypeInstance,
  program,
  degreeProgram,
  degreeProgramYearBase,
  scholarship,
  programScholarship,
  ranking,
  categoryTag,
  disciplineTag,
  categoryTagDisciplineTag,
  majorDisciplineTag,
  universityMajorDisciplineTagBase,
];

export { seeds };
